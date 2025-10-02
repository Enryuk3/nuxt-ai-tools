<script lang="ts" setup>

</script>

<template>
  <div class="min-h-screen flex flex-col items-center relative">
    <AppNavbar>
      <template #right>
        <ThemeToggle />
      </template>
    </AppNavbar>

    <div class="flex flex-1 pt-16 w-full sm:w-auto">
      <slot />
    </div>
  </div>
</template>
