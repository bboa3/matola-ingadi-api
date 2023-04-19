import { getClientBillsUseCase } from '@bill/useCases/get-client-bills'
import { verifyAdmin } from '@core/infra/middleware/auth/verify-admin'
import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getClientBillsController = (request: FastifyRequest, response: FastifyReply) => {
  pipe(
    verifyAdmin(request, request.body),
    TE.chain(body => getClientBillsUseCase(request, body)),
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
