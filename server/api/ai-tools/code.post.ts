import { openai } from '~~/server/utils/openai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 4000,
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

  return res.choices[0].message.content
})
