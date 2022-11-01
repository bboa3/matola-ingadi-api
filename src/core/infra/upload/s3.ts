import { fail, HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import AWS from 'aws-sdk'
import { Blob } from 'buffer'
import { config } from 'dotenv'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

config()

interface Props {
  name: string
  blob: Blob
  bucketName?: string
}

type S3Upload = (data: Props) => TE.TaskEither<HttpErrorResponse, AWS.S3.ManagedUpload.SendData>

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('Aws environment Variable are not set')
}

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

export const s3Upload: S3Upload = ({ bucketName, name, blob }: Props) => {
  return pipe(
    TE.tryCatch(
      async () => {
        if (!bucketName) {
          throw new Error('Please add AWS_S3_BUCKET_NAME to .env')
        }

        return await s3.upload({
          Bucket: bucketName,
          Key: name,
          Body: blob
        }).promise()
      },
      err => {
        console.log(err)
        return fail(new Error(`Cuold not upload the image ${name}`))
      }
    )
  )
}
