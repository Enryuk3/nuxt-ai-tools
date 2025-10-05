<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import * as z from 'zod'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const schema = z.object({
  blogTopic: z.string().min(1, 'Article topic is required'),
  blogCategory: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  blogTopic: '',
  blogCategory: 'General',
})

const blogCategories = ref([
  'General',
  'Technology',
  'Business',
  'Health',
  'Lifestyle',
  'Education',
  'Travel',
  'Food',
])

const isLoading = ref(false)
const error = ref<AppError | null>(null)
const content = ref('')
const { toggleModalState } = useProModal()

async function generateArticle(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    const data = await $fetch('/api/ai-tools/generate-blog-title', {
      method: 'POST',
      body: {
        blogTopic: event.data.blogTopic,
        blogCategory: event.data.blogCategory,
      },
    })

    if (data) {
      content.value = data
      state.blogTopic = ''
      state.blogCategory = 'General'
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
        title="Blog Title Generator"
        description="Discover compelling and attention-grabbing blog titles instantly with AI-powered suggestions"
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
                <UFormField name="blogTopic" label="Blog Topic">
                  <UInput v-model="state.blogTopic" class="w-full" />
                </UFormField>
                <UFormField name="blogCategory" label="Blog Category">
                  <USelect v-model="state.blogCategory" :items="blogCategories" class="w-full" />
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
              Generating Blogs title...
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
