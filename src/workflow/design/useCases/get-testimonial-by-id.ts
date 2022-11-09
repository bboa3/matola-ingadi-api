import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { getTestimonialByIdDB } from '@design/domain/entities/get-testimonial-by-id'
import { getTestimonialByIdService } from '@design/services/get-testimonial-by-id'
import { getTestimonialByIdPropsValidator } from '@design/services/validate/get-testimonial-by-id'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getTestimonialByIdUseCase: Middleware = (httpRequest, _httpBody) => {
  const { id } = httpRequest.params

  const data = { id }

  const httpResponse = pipe(
    data,
    getTestimonialByIdPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getTestimonialByIdService(getTestimonialByIdDB),
      TE.map(testimonial => {
        return ok(testimonial)
      })
    ))
  )

  return httpResponse
}
