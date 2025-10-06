<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import * as z from 'zod'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Code Generation',
  description: 'Generate code efficiently with our AI tool',
  robots: 'noindex, nofollow',
})

const schema = z.object({
  userPrompt: z.string().min(1, 'Prompt is required'),
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  userPrompt: '',
})

interface Message {
  role: 'user' | 'system'
  content: string
}

const messages = ref<Message[]>([])

const isLoading = ref(false)
const error = ref<AppError | null>(null)
const { toggleModalState } = useProModal()

async function sendMessage(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true
    messages.value.push({
      role: 'user',
      content: event.data.userPrompt.trim(),
    })
    const data = await $fetch('/api/ai-tools/conversation', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    })

    if (data) {
      messages.value.push({
        role: 'system',
        content: data,
      })

      await refreshNuxtData('userData')
      state.userPrompt = ''
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
        title="Code Generation"
        description="Generate code using descriptive text"
      />

      <UAlert
        v-if="error"
        color="error"
        variant="subtle"
        :title="`${error?.statusCode} `"
        :description="error?.statusMessage"
        class="mb-2"
      />

      <UCard variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
        <div class="flex flex-col gap-y-4">
          <div
            v-for="msg in messages"
            :key="msg.content"
            class="flex items-start gap-x-2"
            :class="[msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div class="flex items-start space-x-2">
              <UButton
                size="sm"
                variant="soft"
                class="rounded-full"
                :icon="msg.role === 'user' ? 'i-lucide-user' : 'i-lucide-cpu'"
                :color="msg.role === 'user' ? 'primary' : 'success'"
              />
            </div>
            <UCard :ui="{ body: 'p-3 sm:p-3' }">
              <div class="text-sm max-w-prose">
                <MDC :value="msg.content" />
              </div>
            </UCard>
          </div>
        </div>
      </UCard>
      <!-- Chat input -->
      <div class="pt-4">
        <UForm :schema="schema" :state="state" @submit="sendMessage">
          <div class="flex space-x-2 w-full">
            <UFormField class="flex-1" name="userPrompt">
              <UTextarea v-model="state.userPrompt" :rows="1" class="w-full" />
            </UFormField>
            <UButton type="submit" icon="i-lucide-send" color="primary" />
          </div>
        </UForm>
      </div>
    </UContainer>
  </div>
</template>
