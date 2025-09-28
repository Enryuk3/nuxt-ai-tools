import type { RouteLocationRaw } from 'vue-router'
import { polarClient } from '@polar-sh/better-auth'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: 'http://localhost:3000',
    plugins: [
      polarClient(),
    ],
  })

  const logout = async ({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) => {
    await authClient.signOut()
    if (redirectTo) {
      await navigateTo(redirectTo)
    }
  }

  const upgradeUserToPro = async () => {
    await authClient.checkout({
      slug: 'pro-monthly',
    })
  }

  return {
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    logout,
    upgradeUserToPro,
  }
}
