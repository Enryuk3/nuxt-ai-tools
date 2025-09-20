<script lang="ts" setup>
interface Heading {
  title: string
  description: string

}

defineProps<Heading>()
</script>

<template>
  <div class="mb-8 space-y-1">
    <h2 class="text-2xl font-bold">
      {{ title }}
    </h2>
    <p class="text-muted font-light text-sm md:text-lg">
      {{ description }}
    </p>
  </div>
</template>
