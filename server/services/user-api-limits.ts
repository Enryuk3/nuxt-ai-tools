export async function incrementApiLimit(userId: string) {
  const result = await prisma.userApiLimit.upsert({
    where: { userId },
    create: { userId, count: 1 },
    update: { count: { increment: 1 } },
  })

  return result
}

export async function getUserApiLimitCount(userId: string) {
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit) {
    return 0
  }

  return userApiLimit.count
}
