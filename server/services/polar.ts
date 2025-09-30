import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'

const { polarAccessToken, polarServer, polarProductId, polarWebhookSecret } = useRuntimeConfig()

function polarClient() {
  return new Polar({
    accessToken: polarAccessToken,
    server: polarServer as 'production' | 'sandbox',
  })
}

export function setupPolar() {
  return polar({
    client: polarClient(),
    createCustomerOnSignUp: true,
    use: [
      checkout({
        products: [
          {
            productId: polarProductId,
            slug: 'pro-monthly',
          },
        ],
        successUrl: '/',
        authenticatedUsersOnly: true,
      }),
      portal(),
      usage(),
      webhooks({
        secret: polarWebhookSecret,
      }),
    ],
  })
}

export async function getPolarCustomerState(userId: string) {
  const polar = polarClient()
  const customerState = await polar.customers.getStateExternal({ externalId: userId })
  return customerState
}

export async function getCustomerPortalUrl(userId: string) {
  const polar = polarClient()
  const customerSession = await polar.customerSessions.create({ externalCustomerId: userId })
  return customerSession.customerPortalUrl
}
