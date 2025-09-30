<script lang="ts" setup>
import { MAX_COUNT } from '~~/shared/utils/user-api-limit'

const { upgradeUserToPro } = useAuth()
const { data: userData, status } = await useFetch('/api/user', {
  key: 'userData',
})
const progress = computed(() => {
  if (userData.value) {
    return Math.min((userData.value.userApiLimitCount / MAX_COUNT) * 100, 100)
  }

  return 0
})

const isPro = computed(() => !!userData.value?.subscription)
</script>

<template>
  <div v-if="status !== 'pending' && !isPro" class="mt-auto">
    <USeparator />
    <div class="px-3">
      <div class="py-6 px-2">
        <div class="text-sm mb-4 space-y-2">
          <p v-if="userData && userData.userApiLimitCount > MAX_COUNT">
            {{ MAX_COUNT }} / {{ MAX_COUNT }} Free generations (Limit exceeded)
          </p>
          <p v-else>
            {{ userData ? userData.userApiLimitCount : 0 }} / {{ MAX_COUNT }} Free generations
          </p>
          <UProgress :model-value="progress" />
        </div>
        <UButton
          icon="i-lucide:zap"
          color="error"
          class="w-full justify-center"
          @click="upgradeUserToPro"
        >
          Upgrade
        </UButton>
      </div>
    </div>
  </div>
</template>
