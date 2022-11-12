import { getClientByIdDB } from '@bill/domain/entities/get-client-by-id'
import { getInvoiceDB } from '@bill/domain/entities/get-invoice'
import { createInvoiceDocumentService } from '@bill/services/create-invoice-document'
import { createBillDocumentPropsValidator } from '@bill/services/validate/create-bill-document'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createInvoiceDocumentUseCase: Middleware = (httpRequest, httpBody) => {
  const { userId } = httpBody
  const { billId, invoiceId } = httpRequest.query
  const data = { billId, invoiceId, userId }

  const SERVER_URL = process.env.SERVER_URL

  if (!SERVER_URL) {
    throw new Error('Ops, SERVER_URL is empty from .env')
  }

  const httpResponse = pipe(
    data,
    createBillDocumentPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createInvoiceDocumentService(getInvoiceDB)(getClientByIdDB),
      TE.map(invoiceName => {
        const invoiceUrl = `${SERVER_URL}/view/invoice/${invoiceName}`

        return ok(invoiceUrl)
      })
    ))
  )

  return httpResponse
}
