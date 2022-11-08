import { fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { s3Upload } from '@core/infra/upload/s3'
import { Blob } from 'buffer'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

interface File {
  name: string
  blob: Blob
}

export const uploadGalleryUseCase: Middleware = (httpRequest, httpBody) => {
  const { eventTypeId } = httpBody
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  const { image0, image1, image2, image3 } = httpRequest.raw.files

  const files: File[] = []

  if (image0) {
    files.push({
      name: `${eventTypeId}-0`,
      blob: image0.data
    })
  }

  if (image1) {
    files.push({
      name: `${eventTypeId}-1`,
      blob: image1.data
    })
  }

  if (image2) {
    files.push({
      name: `${eventTypeId}-2`,
      blob: image2.data
    })
  }

  if (image3) {
    files.push({
      name: `${eventTypeId}-3`,
      blob: image3.data
    })
  }

  const httpResponse = pipe(
    TE.tryCatch(
      async () => {
        for (const file of files) {
          const { name, blob } = file

          await s3Upload({ bucketName, name, blob })
        }
      },
      (err: any) => {
        return fail(new Error(err))
      }
    ),
    TE.map(() => {
      return ok('Done')
    })
  )

  return httpResponse
}
