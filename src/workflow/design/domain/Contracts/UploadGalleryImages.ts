import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import * as TE from 'fp-ts/lib/TaskEither'

interface Image {
  imageIndex: number
  url: string
}

interface Data {
  galleryId: string
  images: Image[]
}

export type UploadGalleryImagesDB = (data: Data) => Promise<'Done'>

export type UploadGalleryImagesService = (db: UploadGalleryImagesDB) =>
(data: Data) => TE.TaskEither<HttpErrorResponse, 'Done'>
