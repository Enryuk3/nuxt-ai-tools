import { incrementApiLimit } from '~~/server/services/user-api-limits'

export default defineAuthenticatedEventHandler(async (event) => {
  const { articleTopic, articleTopicLength } = await readBody(event)

  if (!articleTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Article topic is required',
    })
  }

  const isPro = validateUserStatus(event.context.user.id)

  const prompt = `Write an article about ${articleTopic} in ${articleTopicLength || 500} words`

  const res = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: articleTopicLength || 500,
  })

  if (!isPro) {
    await incrementApiLimit(event.context.user.id)
  }

  return res.choices[0].message.content
})
