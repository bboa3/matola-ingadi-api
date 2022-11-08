import AWS from 'aws-sdk'
import { Blob } from 'buffer'
import { config } from 'dotenv'

config()

interface Props {
  name: string
  blob: Blob
  bucketName?: string
}

type S3Upload = (data: Props) => Promise<AWS.S3.ManagedUpload.SendData>

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Aws environment Variable are not set')
}

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

export const s3Upload: S3Upload = async ({ bucketName, name, blob }: Props) => {
  if (!bucketName) {
    throw new Error('Please add AWS_S3_BUCKET_NAME to .env')
  }

  return await s3.upload({
    Bucket: bucketName,
    Key: name,
    Body: blob
  }).promise()
}
