import { getInvoiceDB } from '@bill/domain/entities/get-invoice'
import { getInvoiceService } from '@bill/services/get-invoice'
import { getInvoicePropsValidator } from '@bill/services/validate/get-invoice'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getInvoiceUseCase: Middleware = (httpRequest, httpBody) => {
  const { userId } = httpBody
  const { billId, invoiceCode } = httpRequest.query
  const data = { billId, invoiceCode, userId }

  const httpResponse = pipe(
    data,
    getInvoicePropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getInvoiceService(getInvoiceDB),
      TE.map(result => ok(result))
    ))
  )

  return httpResponse
}
