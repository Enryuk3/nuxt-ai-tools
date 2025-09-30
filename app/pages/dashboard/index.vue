<script lang="ts" setup>
import { aiTools } from '~~/constants/tools'

definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <UContainer>
    <div class="py-4 w-full max-w-full">
      <PageHeading
        title="Explore the power of AI"
        description="Chat with the smartest AI - Experience the power of AI."
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
      <NuxtLink v-for="tool in aiTools" :key="tool.title" :to="tool.path">
        <UCard class="h-full">
          <div class="mb-4 flex items-center">
            <UIcon :name="tool.icon" class="mr-3 text-primary" />
            <span class="font-semibold">{{ tool.title }}</span>
          </div>
          <p class="text-dimmed">
            {{ tool.description }}
          </p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>
