import type { RouteLocationRaw } from 'vue-router'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: 'http://localhost:3000',
  })

  const logout = async ({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) => {
    await authClient.signOut()
    if (redirectTo) {
      await navigateTo(redirectTo)
    }
  }

  return {
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    logout,
  }
}
