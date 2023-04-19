import { confirmPaymentByAdminUseCase } from '@bill/useCases/confirm-payment-by-admin'
import { verifyAdmin } from '@core/infra/middleware/auth/verify-admin'
import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const confirmPaymentByAdminController = (request: FastifyRequest, response: FastifyReply) => {
  pipe(
    verifyAdmin(request, request.body),
    TE.chain(body => confirmPaymentByAdminUseCase(request, body)),
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
