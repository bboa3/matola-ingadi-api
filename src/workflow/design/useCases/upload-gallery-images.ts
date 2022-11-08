import { fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { createUrl } from '@core/infra/upload/create-url'
import { s3Upload } from '@core/infra/upload/s3'
import { uploadGalleryImagesDB } from '@design/domain/entities/upload-gallery-images'
import { uploadGalleryImagesService } from '@design/services/upload-gallery-images'
import { Blob } from 'buffer'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

interface File {
  name: string
  blob: Blob
  contentType: string
  imageIndex: number
}

export const uploadGalleryImagesUseCase: Middleware = (httpRequest, httpBody) => {
  const { galleryId } = httpBody
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  const { image0, image1, image2, image3 } = httpRequest.raw.files

  const files: File[] = []

  if (image0) {
    const parts = image0.name.split('.')
    const extension0 = parts[parts.length - 1]
    const imageIndex = 0

    files.push({
      name: `${galleryId}-${imageIndex}.${extension0}`,
      blob: image0.data,
      contentType: image0.mimetype,
      imageIndex
    })
  }

  if (image1) {
    const parts = image1.name.split('.')
    const extension1 = parts[parts.length - 1]
    const imageIndex = 1

    files.push({
      name: `${galleryId}-${imageIndex}.${extension1}`,
      blob: image1.data,
      contentType: image1.mimetype,
      imageIndex
    })
  }

  if (image2) {
    const parts = image2.name.split('.')
    const extension2 = parts[parts.length - 1]
    const imageIndex = 2

    files.push({
      name: `${galleryId}-${imageIndex}.${extension2}`,
      blob: image2.data,
      contentType: image2.mimetype,
      imageIndex
    })
  }

  if (image3) {
    const parts = image3.name.split('.')
    const extension3 = parts[parts.length - 1]
    const imageIndex = 3

    files.push({
      name: `${galleryId}-${imageIndex}.${extension3}`,
      blob: image3.data,
      contentType: image3.mimetype,
      imageIndex
    })
  }

  const images = files.map(({ imageIndex, name }) => ({
    imageIndex,
    url: createUrl({ fileName: name, bucketName })
  }))

  const httpResponse = pipe(
    { images, galleryId },
    uploadGalleryImagesService(uploadGalleryImagesDB),
    TE.chain(() => TE.tryCatch(
      async () => {
        for (const file of files) {
          const { name, blob, contentType } = file

          await s3Upload({ bucketName, name, blob, contentType })
        }
      },
      (err: any) => {
        return fail(new Error(err))
      }
    )),
    TE.map(() => {
      return ok('Done')
    })
  )

  return httpResponse
}
