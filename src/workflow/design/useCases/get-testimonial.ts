import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { getTestimonialDB } from '@design/domain/entities/get-testimonial'
import { getTestimonialService } from '@design/services/get-testimonial'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getTestimonialUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getTestimonialService(getTestimonialDB),
    TE.map(gallery => {
      return ok(gallery)
    })
  )

  return httpResponse
}
