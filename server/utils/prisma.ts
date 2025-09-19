import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

const { tursoDatabaseUrl, tursoAuthToken, public: { appEnv } } = useRuntimeConfig()

const adapter = new PrismaLibSQL({
  url: tursoDatabaseUrl,
  authToken: appEnv === 'development' ? undefined : tursoAuthToken,
})
export const prisma = new PrismaClient({ adapter })
