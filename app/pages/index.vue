<script setup lang="ts">
import { aiProductReviews } from '~~/constants/reviews'
import { aiTools } from '~~/constants/tools'
</script>

<template>
  <div class="h-full">
    <!-- Hero -->
    <UContainer>
      <div class="flex flex-col items-center justify-center text-center py-32 sm:py-48 lg:py-56">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight">
          Create amazing AI Tools
        </h1>
        <p class="mt-4 text-lg text-muted-foreground max-w-xl">
          Launch modern websites and apps with beautiful components, built-in in dark mode, and effortless Nuxt 4 integration.
        </p>
        <div class="mt-6">
          <div class="flex gap-4 flex-wrap">
            <UButton
              icon="i-lucide-arrow-up-right"
              to="/dashboard"
              size="lg"
              color="primary"
            >
              Get Started
            </UButton>
            <UButton
              icon="i-lucide-rocket"
              color="neutral"
              variant="outline"
              :ui="{ leadingIcon: 'text-primary' }"
              to="/dashboard"
            >
              Explore Tools
            </UButton>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <UAvatarGroup>
            <UAvatar src="https://github.com/benjamincanac.png" />
            <UAvatar src="https://github.com/benjamincanac.png" />
            <UAvatar src="https://github.com/benjamincanac.png" />
          </UAvatarGroup>
        </div>
      </div>
    </UContainer>

    <!-- Features / Tools -->
    <UContainer>
      <div class="flex flex-col items-center justify-center text-center mb-10 sm:mb-20">
        <h2 class="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p class="text-muted-foreground font-light text-sm md:text-lg text-center">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard
          v-for="tool in aiTools"
          :key="tool.title"
          class="h-full"
          :ui="{ body: 'h-full' }"
        >
          <div class="flex flex-col gap-y-2 h-full">
            <div class="flex-1">
              <UButton
                :icon="tool.icon"
                size="md"
                color="primary"
                variant="subtle"
              />
              <h6 class="font-semibold my-4">
                {{ tool.title }}
              </h6>
              <p class="text-dimmed">
                {{ tool.description }}
              </p>
            </div>
            <div class="mt-auto">
              <UButton :to="tool.path" trailing-icon="i-lucide-arrow-right" size="md">
                {{ tool.btnText }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Reviews -->
    <UContainer class="mt-32 sm:mt-40 lg:mt-56 mb-40">
      <div class="flex flex-col items-center justify-center text-center mb-10 sm:mb-20">
        <h2 class="text-2xl md:text-4xl font-bold text-center">
          Loved by customers
        </h2>
        <p class="text-muted-foreground font-light text-sm md:text-lg text-center">
          Checkout the reviews, what our existing customers says about our tools and products.
        </p>
      </div>
      <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 scroll-mt-[calc(var(--header-height)+1rem)]">
        <div v-for="review in aiProductReviews" :key="review.title">
          <UCard class="h-full" :ui="{ body: 'h-full' }">
            <p>
              {{ review.review }}
            </p>
            <template #footer>
              <div class="flex items-center gap-3">
                <UAvatar size="xl" :src="review.url" />
                <div>
                  <h6 class="text-lg font-bold">
                    {{ review.user }}
                  </h6>
                  <p class="text-sm">
                    {{ review.designation }}
                  </p>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
