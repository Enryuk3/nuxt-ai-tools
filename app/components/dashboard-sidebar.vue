<script lang="ts" setup>
import { sidebarRoutes } from '~~/constants/tools'
</script>

<template>
  <aside class="fixed top-0 left-0 transition-all duration-300 hidden sm:block w-72">
    <div class="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div class="h-16 px-5 flex items-center">
        <Logo />
      </div>
      <div class="flex-1 overflow-y-auto">
        <USeparator />
        <div class="px-3 py-4">
          <UNavigationMenu
            :items="sidebarRoutes"
            orientation="vertical"
            class="data-[orientation=vertical]:w-full"
            :ui="{ label: 'py-2.5', link: 'py-3' }"
          />
        </div>
      </div>

      <UserCounter />
    </div>
  </aside>
</template>
