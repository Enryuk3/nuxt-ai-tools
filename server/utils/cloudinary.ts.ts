import { v2 as cloudinary } from 'cloudinary'

const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = useRuntimeConfig()

export async function connectCloudinary() {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  })
}
