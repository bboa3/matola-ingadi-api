import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { updateTestimonialDB } from '@design/domain/entities/update-testimonial'
import { updateTestimonialService } from '@design/services/update-testimonial'
import { updateTestimonialPropsValidator } from '@design/services/validate/update-testimonial'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateTestimonialUseCase: Middleware = (_httpRequest, httpBody) => {
  const { testimonialId, name, image, description, eventType } = httpBody

  const data = { testimonialId, name, image, description, eventType }

  const httpResponse = pipe(
    data,
    updateTestimonialPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      updateTestimonialService(updateTestimonialDB),
      TE.map(testimonial => {
        return ok(testimonial)
      })
    ))
  )

  return httpResponse
}
