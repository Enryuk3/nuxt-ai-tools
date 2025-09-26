import { incrementApiLimit } from '~~/server/services/user-api-limits'
import { openai } from '~~/server/utils/openai'

export default defineAuthenticatedEventHandler(async (event) => {
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
      { role: 'system', content: 'You are a helpful assistant.' },
      ...messages,
    ],
    temperature: 0.5,
    max_completion_tokens: 500,
  })

  await incrementApiLimit(event.context.user.id)

  return res.choices[0].message.content
})
