<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import * as z from 'zod'

definePageMeta({
  layout: 'dashboard',
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = ['application/pdf']

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

const schema = z.object({
  resume: z
    .instanceof(File, {
      message: 'Please select a resume file.',
    })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: `The resume file is too large. Please choose an resume file smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid resume file (PDF).',
    }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  resume: undefined,
})

const isLoading = ref(false)
const error = ref<AppError | null>(null)
const content = ref('')
const { toggleModalState } = useProModal()

async function reviewResume(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    const formData = new FormData()
    if (event.data.resume instanceof File) {
      formData.append('image', event.data.resume)
    }

    const data = await $fetch('/api/ai-tools/review-resume', {
      method: 'POST',
      body: formData,
    })

    if (data) {
      content.value = data
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
        title="Resume Reviewer"
        description="Enhance your resume with AI-powered insights to boost your changes of getting hired."
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
        <div class="flex flex-col space-y-4">
          <div class="w-full">
            <UCard>
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4 w-96"
                @submit="reviewResume"
              >
                <UFormField name="resume" label="Resume File" description="PDF 5MB Max.">
                  <UFileUpload v-model="state.resume" accept=".pdf" class="min-h-48" />
                </UFormField>
                <UButton type="submit" color="neutral" label="Submit" />
              </UForm>
            </UCard>
          </div>
          <UCard :ui="{ body: 'p-3 sm:p-3 h-full' }" class="flex-1 max-w-[300px]">
            <div v-if="content" class="h-full">
              <MDC :value="content" />
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center h-full">
              Reviewing the resume...
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
