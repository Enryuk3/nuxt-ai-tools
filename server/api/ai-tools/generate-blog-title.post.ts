import { incrementApiLimit } from '~~/server/services/user-api-limits'

export default defineAuthenticatedEventHandler(async (event) => {
  const { blogTopic, blogCategory } = await readBody(event)

  if (!blogTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Blog topic is required',
    })
  }
  if (!blogCategory) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Blog category is required',
    })
  }

  const isPro = validateUserStatus(event.context.user.id)

  const prompt = `Generate a blog title for keywords ${blogTopic} in the category ${blogCategory}`

  const res = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 200,
  })

  if (!isPro) {
    await incrementApiLimit(event.context.user.id)
  }

  return res.choices[0].message.content
})
