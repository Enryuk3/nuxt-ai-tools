import { getPolarCustomerState } from '~~/server/services/polar'

async function getUserFreeTrialStatus(userId: string) {
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit || userApiLimit.count >= MAX_COUNT) {
    return true
  }

  return false
}

async function getUserProStatus(userId: string) {
  const customer = await getPolarCustomerState(userId)
  return !!customer.activeSubscriptions[0]
}

export async function validateUserStatus(userId: string) {
  const isFreeTrialExist = await getUserFreeTrialStatus(userId)
  const isPro = await getUserProStatus(userId)

  if (!isPro && !isFreeTrialExist) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Free trial has expired. Please upgrade to pro.',
    })
  }

  return isPro
}
