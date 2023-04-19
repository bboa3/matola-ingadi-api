import { createInvoiceDocumentUseCase } from '@bill/useCases/create-invoice-document'
import { verifyClient } from '@core/infra/middleware/auth/verify-client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createInvoiceDocumentController = (request: FastifyRequest, response: FastifyReply) => {
  pipe(
    verifyClient(request, request.body),
    TE.chain(body => createInvoiceDocumentUseCase(request, body)),
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
