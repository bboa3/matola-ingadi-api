import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { config } from 'dotenv'

config()

interface Props {
  name: string
  bucketName?: string
}

type S3Upload = (data: Props) => Promise<string>

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_S3_REGION = process.env.AWS_DEFAULT_REGION

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_REGION) {
  throw new Error('Aws environment Variable are not set')
}

const s3Client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

export const generateS3Link: S3Upload = async ({ bucketName, name }: Props) => {
  if (!bucketName) {
    throw new Error('Please add AWS_S3_BUCKET_NAME to .env')
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: name
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return url
}
