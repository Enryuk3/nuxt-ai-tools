import type { H3Event } from 'h3'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { setupPolar } from '~~/server/services/polar'
import { prisma } from '~~/server/utils/prisma'

const { githubClientId, githubClientSecret, googleClientId, googleClientSecret } = useRuntimeConfig()
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  plugins: [
    setupPolar(),
  ],
})

export async function getAuthSession(event: H3Event) {
  const headers = event.headers
  const session = await auth.api.getSession({ headers })

  return session
}

export async function requireAuth(event: H3Event) {
  const session = await getAuthSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  event.context.user = session.user
}
