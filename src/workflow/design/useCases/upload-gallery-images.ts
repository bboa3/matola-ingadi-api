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
  contentType: string
}

export const uploadGalleryImagesUseCase: Middleware = (httpRequest, httpBody) => {
  const { eventTypeId } = httpBody
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  const { image0, image1, image2, image3 } = httpRequest.raw.files

  const files: File[] = []

  if (image0) {
    const parts = image0.name.split('.')
    const extension = parts[parts.length - 1]

    files.push({
      name: `${eventTypeId}-0.${extension}`,
      blob: image0.data,
      contentType: image0.mimetype
    })
  }

  if (image1) {
    const parts = image1.name.split('.')
    const extension = parts[parts.length - 1]

    files.push({
      name: `${eventTypeId}-1.${extension}`,
      blob: image1.data,
      contentType: image1.mimetype
    })
  }

  if (image2) {
    const parts = image2.name.split('.')
    const extension = parts[parts.length - 1]

    files.push({
      name: `${eventTypeId}-2.${extension}`,
      blob: image2.data,
      contentType: image2.mimetype
    })
  }

  if (image3) {
    const parts = image3.name.split('.')
    const extension = parts[parts.length - 1]

    files.push({
      name: `${eventTypeId}-3.${extension}`,
      blob: image3.data,
      contentType: image3.mimetype
    })
  }

  const httpResponse = pipe(
    TE.tryCatch(
      async () => {
        for (const file of files) {
          const { name, blob, contentType } = file

          await s3Upload({ bucketName, name, blob, contentType })
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
