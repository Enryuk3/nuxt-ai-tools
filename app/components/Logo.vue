<script lang="ts" setup>
const colorMode = useColorMode()
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2">
    <span class="font-bold text-xl flex items-center">
      <NuxtImg
        src="/logo.svg"
        alt="Logo"
        class="w-6 h-6 mr-1"
        :class="[colorMode.value === 'light' ? '' : 'invert-100']"
      />
      AI Tools
    </span>
  </NuxtLink>
</template>
