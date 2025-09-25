import { extractText, getDocumentProxy } from 'unpdf'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('resume') as File

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Resume is required',
    })
  }

  const arrayBuffer = await file.arrayBuffer()
  // eslint-disable-next-line node/prefer-global/buffer
  const buffer = Buffer.from(arrayBuffer)

  const pdf = await getDocumentProxy(new Uint8Array(buffer))

  const { text } = await extractText(pdf, { mergePages: true })

  const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. 
  Resume Content: \n\n${text}`

  const res = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [

      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 1000,
  })

  return res.choices[0].message.content
})
