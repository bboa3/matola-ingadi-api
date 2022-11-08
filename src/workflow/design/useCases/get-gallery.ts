import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { getGalleryDB } from '@design/domain/entities/get-gallery'
import { getGalleryService } from '@design/services/get-gallery'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getGalleryUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getGalleryService(getGalleryDB),
    TE.map(gallery => {
      return ok(gallery)
    })
  )

  return httpResponse
}
