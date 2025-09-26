import { openai } from '~~/server/utils/openai'

export default defineEventHandler(async (event) => {
  const { articleTopic, articleTopicLength } = await readBody(event)

  if (!articleTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Article topic is required',
    })
  }

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

  return res.choices[0].message.content
})
