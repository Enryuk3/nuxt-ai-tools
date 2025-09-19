<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const { signIn } = useAuth()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await signIn.email({
    email: event.data.email,
    password: event.data.password,
    callbackURL: '/',
  })
  console.error(error)
}
</script>

<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Welcome back
          </h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-simple-icons-google"
            :loading="false"
            :disabled="false"
            block
            @click="signIn.social({
              provider: 'google',
              callbackURL: '/',
            })"
          >
            Google
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
            :loading="false"
            :disabled="false"
            block
            @click="signIn.social({
              provider: 'github',
              callbackURL: '/',
            })"
          >
            GitHub
          </UButton>
        </div>
        <USeparator label="Or" />
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="state.email"
              placeholder="Your email"
              autocomplete="email"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Your password"
              autocomplete="new-password"
              class="w-full"
            />
          </UFormField>
          <UButton color="primary" type="submit" block>
            Sign in
          </UButton>
        </UForm>
        <div class="text-center text-sm">
          Don't have an account?
          <UButton
            variant="link"
            color="primary"
            :disabled="false"
            to="/auth/register"
            class="-ml-2"
          >
            Create now
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
