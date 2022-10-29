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

export const createInvoiceDocumentUseCase: Middleware = (httpRequest, _httpBody) => {
  const clientId = '634f1481440e32a71252fab0'
  const { billId, invoiceNumber } = httpRequest.query
  const data = { billId, invoiceNumber, clientId }

  const httpResponse = pipe(
    data,
    createBillDocumentPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createInvoiceDocumentService(getInvoiceDB)(getClientByIdDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
