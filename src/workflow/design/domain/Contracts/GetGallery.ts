import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Gallery } from 'design'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetGalleryDB = () => Promise<Gallery[]>

export type GetGalleryService = (db: GetGalleryDB) =>
TE.TaskEither<HttpErrorResponse, Gallery[]>
