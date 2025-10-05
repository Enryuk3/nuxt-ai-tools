<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { sidebarRoutes } from '~~/constants/tools'

const open = ref(false)
const { logout, user } = useAuth()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: '/dashboard/settings',
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: async () => {
      await logout({ redirectTo: '/auth/login' })
    },
  },
])

const { data: userData } = await useFetch('/api/user', {
  key: 'userData',
})
</script>

<template>
  <div class="fixed h-16 top-0 right-0 left-0 sm:left-72 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <UContainer class="flex h-full items-center justify-between sm:justify-end">
      <UDrawer
        v-model:open="open"
        direction="left"
        :handle="false"
        :ui="{ header: 'flex items-center justify-between h-16 px-5', container: 'p-0 w-72 gap-0' }"
      >
        <UButton
          class="sm:hidden"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-menu"
        />
        <template #header>
          <Logo />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="open = false"
          />
        </template>
        <template #body>
          <div class="flex flex-col h-full">
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
          </div>
        </template>
      </UDrawer>

      <UDropdownMenu
        v-if="user"
        :items="items"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-48',
        }"
      >
        <UButton
          label="Open"
          :icon="!user?.image ? 'i-lucide-user' : undefined"
          color="neutral"
          variant="outline"
        >
          <UAvatar
            v-if="user && user?.image"
            :src="user.image"
            :alt="user.name"
            size="sm"
          />
          <span>
            {{ user.name }}
            <UBadge v-if="userData?.subscription" label="Pro" />
          </span>
        </UButton>
      </UDropdownMenu>
      <ThemeToggle />
    </UContainer>
  </div>
</template>
