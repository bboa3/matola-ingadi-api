import { getPaymentMethodUseCase } from '@bill/useCases/get-payment-method'
import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getPaymentMethodController = (request: FastifyRequest, response: FastifyReply) => {
  pipe(
    getPaymentMethodUseCase(request, request.body),
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
