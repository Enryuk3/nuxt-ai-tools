<script lang="ts" setup>
const mode = useColorMode()

function toggleTheme() {
  mode.preference = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div>
    <UButton
      color="neutral"
      variant="ghost"
      :icon="mode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
      @click="toggleTheme"
    />
  </div>
</template>
