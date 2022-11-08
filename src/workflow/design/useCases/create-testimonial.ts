import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { createTestimonialDB } from '@design/domain/entities/create-testimonial'
import { createTestimonialService } from '@design/services/create-testimonial'
import { createTestimonialPropsValidator } from '@design/services/validate/create-testimonial'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createTestimonialUseCase: Middleware = (_httpRequest, httpBody) => {
  const { name, image, description, eventType } = httpBody

  const data = { name, image, description, eventType }

  const httpResponse = pipe(
    data,
    createTestimonialPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createTestimonialService(createTestimonialDB),
      TE.map(testimonial => {
        return ok(testimonial)
      })
    ))
  )

  return httpResponse
}
