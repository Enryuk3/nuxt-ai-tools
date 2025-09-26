import { requireAuth } from '~~/server/services/better-auth'

export default defineEventHandler(async (event) => {
  const protectedRoutes = [
    '/api/ai-tools',
    '/api/ai-cloudinary-tools',
    '/api/user',
  ]
  const needsAuth = protectedRoutes.some(p => event.path === p || event.path.startsWith(`${p}/`))
  if (needsAuth) {
    await requireAuth(event)
  }
})
