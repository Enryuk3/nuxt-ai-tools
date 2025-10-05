<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const schema = z.object({
  name: z.string().trim().min(5, 'Name must be at least 5 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
})

const { signUp, signIn } = useAuth()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await signUp.email({
    email: event.data.email,
    password: event.data.password,
    name: event.data.name,
    callbackURL: '/dashboard',
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
            Create your account
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
              callbackURL: '/dashboard',
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
              callbackURL: '/dashboard',
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
          <UFormField label="Name" name="name" required>
            <UInput
              v-model="state.name"
              placeholder="Your name"
              autocomplete="name"
              class="w-full"
            />
          </UFormField>
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
          <UFormField label="Confirm Password" name="confirmPassword" required>
            <UInput
              v-model="state.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autocomplete="new-password"
              class="w-full"
            />
          </UFormField>
          <UButton color="primary" type="submit" block>
            Register
          </UButton>
        </UForm>
        <div class="text-center text-sm">
          Already have an account?
          <UButton
            variant="link"
            color="primary"
            :disabled="false"
            to="/auth/login"
            class="-ml-2"
          >
            Sign in
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
