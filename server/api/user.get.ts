import { getUserApiLimitCount } from '~~/server/services/user-api-limits'

export default defineAuthenticatedEventHandler(async (event) => {
  const userApiLimitCount = await getUserApiLimitCount(event.context.user.id)

  return {
    userApiLimitCount,
  }
})
