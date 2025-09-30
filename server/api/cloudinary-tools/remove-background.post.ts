import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import { incrementApiLimit } from '~~/server/services/user-api-limits'

export default defineAuthenticatedEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('image') as File

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const isPro = validateUserStatus(event.context.user.id)

  const arrayBuffer = await file.arrayBuffer()
  // eslint-disable-next-line node/prefer-global/buffer
  const buffer = Buffer.from(arrayBuffer)

  await connectCloudinary()

  const uploadFromBuffer = async (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        transformation: [
          {
            effect: 'background_removal',
            background_removal: 'remove_the_background',
          },
        ],
        folder: 'bg_removed',
      }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error('Upload failed'))
        }
        resolve(result)
      })

      uploadStream.end(buffer)
    })
  }
  const result = await uploadFromBuffer()

  if (!isPro) {
    await incrementApiLimit(event.context.user.id)
  }

  return result.secure_url
})
