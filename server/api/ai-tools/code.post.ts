import { requireAuth } from '~~/server/services/better-auth'
import { incrementApiLimit } from '~~/server/services/user-api-limits'
import { openai } from '~~/server/utils/openai'

export default defineAuthenticatedEventHandler(async (event) => {
  await requireAuth(event)
  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Messages are required',
    })
  }

  const res = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [
      {
        role: 'system',
        content: 'You are a code generator. You must answer only in markdown code snippets. Use',
      },
      {
        role: 'user',
        content: messages,
      },
    ],
    temperature: 0.5,
  })

  await incrementApiLimit(event.context.user.id)

  return res.choices[0].message.content
})
