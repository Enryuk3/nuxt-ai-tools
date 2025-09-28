import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'

const { polarAccessToken, polarServer, polarProductId, polarWebhookSecret } = useRuntimeConfig()
const polarClient = new Polar({
  accessToken: polarAccessToken,
  server: polarServer as 'production' | 'sandbox',
})

export function setupPolar() {
  return polar({
    client: polarClient,
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
