<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Settings',
  description: 'Manage your account subscription in Nuxt AI Tools',
  robots: 'noindex, nofollow',
})

const { upgradeUserToPro } = useAuth()

const { data: userData, status } = await useFetch('/api/user', {
  key: 'userData',
})

const isPro = computed(() => !!userData.value?.subscription)

const subscriptionMessage = computed(() => {
  if (!isPro.value) {
    return 'You are currently on a free plan.'
  }

  const sub = userData.value?.subscription
  const rawEnd = sub?.endsAt ?? sub?.currentPeriodEnd

  const endDate = rawEnd ? new Date(rawEnd).toDateString() : 'unknown'

  if (sub?.cancelAtPeriodEnd) {
    return `You are currently on a Pro plan, but it will be cancelled on ${endDate}`
  }
  return `You are currently on a Pro plan. Next billing date: ${endDate}`
})
</script>

<template>
  <div>
    <UContainer class="h-[calc(100dvh-80px)] flex flex-col py-4">
      <PageHeading title="Settings" description="Manage account settings." />
      <div class="flex flex-col gap-4">
        <div class="text-muted-foreground text-sm">
          {{ subscriptionMessage }}
        </div>
        <div class="flex gap-4">
          <UButton
            v-if="userData && isPro"
            :disabled="status === 'pending'"
            :to="userData.customerPortalUrl"
          >
            Manage Subscription
          </UButton>
          <UButton
            v-else
            icon="i-lucide:zap"
            color="error"
            :disabled="status === 'pending'"
            @click="upgradeUserToPro"
          >
            Upgrade
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
