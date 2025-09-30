import { getCustomerPortalUrl, getPolarCustomerState } from '~~/server/services/polar'
import { getUserApiLimitCount } from '~~/server/services/user-api-limits'

export default defineAuthenticatedEventHandler(async (event) => {
  const userApiLimitCount = await getUserApiLimitCount(event.context.user.id)
  const customerPortalUrl = await getCustomerPortalUrl(event.context.user.id)
  const customerState = await getPolarCustomerState(event.context.user.id)

  const subscription = customerState.activeSubscriptions[0]

  return {
    userApiLimitCount,
    customerPortalUrl,
    subscription,
  }
})
