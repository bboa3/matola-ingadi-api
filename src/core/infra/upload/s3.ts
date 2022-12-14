import { PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3'
import { Blob } from 'buffer'
import { config } from 'dotenv'

config()

interface Props {
  name: string
  blob: Blob
  bucketName?: string
  contentType: string
}

type S3Upload = (data: Props) => Promise<PutObjectCommandOutput>

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

export const s3Upload: S3Upload = async ({ bucketName, name, blob, contentType }: Props) => {
  if (!bucketName) {
    throw new Error('Please add AWS_S3_BUCKET_NAME to .env')
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Body: blob,
    Key: name,
    ContentType: contentType
  })

  const result = await s3Client.send(command)
  return result
}
