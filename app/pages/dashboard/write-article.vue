<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import * as z from 'zod'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Article Writer',
  description: 'Generate complete articles with our AI-powered writing tool',
  robots: 'noindex, nofollow',
})

const schema = z.object({
  articleTopic: z.string().min(1, 'Article topic is required'),
  articleLength: z.number(),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  articleTopic: '',
  articleLength: 500,
})

const articleItems = ref([
  {
    label: 'Short (500-800 words)',
    value: 500,
  },
  {
    label: 'Medium (800-1000 words)',
    value: 1200,
  },
  {
    label: 'Long (1200+ words)',
    value: 1600,
  },
])

const isLoading = ref(false)
const error = ref<AppError | null>(null)
const content = ref('')
const { toggleModalState } = useProModal()

async function generateArticle(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    const data = await $fetch('/api/ai-tools/generate-article', {
      method: 'POST',
      body: {
        articleTopic: event.data.articleTopic,
        articleLength: event.data.articleLength,
      },
    })

    if (data) {
      content.value = data
      state.articleTopic = ''
      state.articleLength = 500
    }
  }
  catch (e) {
    const err = e as FetchError
    if (err.statusCode === 401) {
      navigateTo('/auth/login')
    }
    if (err.statusCode === 403) {
      toggleModalState(true)
    }
    error.value = getError(err)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <UContainer class="h-[calc(100dvh-80px)] flex flex-col py-4">
      <PageHeading
        title="AI Article Writer"
        description="Craft well-structured and engaging articles on any subject using advanced AI writing assistance."
      />

      <UAlert
        v-if="error"
        color="error"
        variant="subtle"
        :title="`${error?.statusCode} `"
        :description="error?.statusMessage"
        class="mb-2"
      />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-2">
          <div>
            <UCard>
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="generateArticle"
              >
                <UFormField name="articleTopic" label="Article Topic">
                  <UInput v-model="state.articleTopic" class="w-full" />
                </UFormField>
                <UFormField name="articleLength" label="Article Length">
                  <USelect v-model="state.articleLength" :items="articleItems" class="w-full" />
                </UFormField>
                <UButton type="submit" color="neutral">
                  Submit
                </UButton>
              </UForm>
            </UCard>
          </div>
          <UCard :ui="{ body: 'h-[calc(100dvh-350px)]' }" class="flex-1 overflow-y-auto">
            <div v-if="content" class="h-full">
              <MDC :value="content" />
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
              Generating article...
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
