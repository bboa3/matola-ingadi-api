import { verifyAdmin } from '@core/infra/middleware/auth/verify-admin'
import { updateTestimonialUseCase } from '@design/useCases/update-testimonial'
import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateTestimonialController = (request: FastifyRequest, response: FastifyReply) => {
  pipe(
    verifyAdmin(request, request.body),
    TE.chain(body => updateTestimonialUseCase(request, body)),
    TE.match(
      (httpErrorResponse) => {
        const { statusCode, body } = httpErrorResponse
        return response.status(statusCode).send(body)
      },
      (httpSuccessResponse) => {
        const { statusCode, body } = httpSuccessResponse
        return response.status(statusCode).send(body)
      }
    )
  )()
}
