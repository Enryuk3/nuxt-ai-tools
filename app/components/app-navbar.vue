<script lang="ts" setup>

</script>

<template>
  <nav class="fixed h-16 top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <UContainer class="flex h-full items-center justify-between">
      <Logo />
      <slot name="right" />
      <slot name="center" />
    </UContainer>
  </nav>
</template>
