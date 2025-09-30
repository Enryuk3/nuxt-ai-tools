<script lang="ts" setup>
import { aiTools } from '~~/constants/tools'

const { isOpen, toggleModalState } = useProModal()
const { upgradeUserToPro } = useAuth()
</script>

<template>
  <UModal v-model:open="isOpen" title="Upgrade to NuxtAI Pro">
    <template #body>
      <div class="p-4">
        <div class="text-center flex flex-col space-y-2">
          <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
            <UCard
              class=""
              :ui="{ body: 'p-3 sm:p-3' }"
            >
              <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-x-4">
                  <UButton
                    :icon="tool.icon"
                    size="md"
                    color="primary"
                    variant="subtle"
                  />
                  <div class="font-semibold text-sm">
                    {{ tool.title }}
                  </div>
                </div>
                <Icon name="lucide:check" class="size-5 text-primary" />
              </div>
            </UCard>
          </NuxtLink>
        </div>
        <UButton
          icon="i-lucide-zap"
          color="error"
          class="w-full justify-center mt-4"
          label="Upgrade"
          @click="upgradeUserToPro"
        />
      </div>
    </template>
  </UModal>
</template>
