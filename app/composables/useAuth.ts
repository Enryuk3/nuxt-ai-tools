import type { ClientOptions, InferSessionFromClient, InferUserFromClient } from 'better-auth'
import type { RouteLocationRaw } from 'vue-router'
import { polarClient } from '@polar-sh/better-auth'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: 'http://localhost:3000',
    plugins: [
      polarClient(),
    ],
  })

  const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
  const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)
  const sessionFetching = import.meta.server ? ref(false) : useState('auth:session-fetching', () => false)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }

    sessionFetching.value = true

    const { data } = await authClient.getSession({
      fetchOptions: {
        headers,
      },
    })

    session.value = data?.session || null
    user.value = data?.user || null
    sessionFetching.value = false
    return data
  }

  if (import.meta.client) {
    authClient.$store.listen('$sessionSignal', async (signal) => {
      if (!signal)
        return
      await fetchSession()
    })
  }

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
    session,
    user,
    loggedIn: computed(() => !!session.value),
    fetchSession,
  }
}
