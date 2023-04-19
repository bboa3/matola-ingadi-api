import { findBillByIdDB } from '@bill/domain/entities/find-bill-by-id'
import { invoicePaymentDB } from '@bill/domain/entities/invoice-payment'
import { updateEventDateDB } from '@bill/domain/entities/update-event-date'
import { invoicePaymentService } from '@bill/services/invoice-payment'
import { invoicePaymentPropsValidator } from '@bill/services/validate/invoice-payment'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { invoicePaymentReportUseCase } from '@mail/useCases/invoice-payment-report'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoicePaymentUseCase: Middleware = (httpRequest, httpBody) => {
  const { billId, invoiceCode, userId, transactionId, confirmedBy, details, transactionTime, paymentGatewayFee } = httpBody
  const { paymentMethod } = httpRequest.params

  const data = { billId, invoiceCode, userId, transactionId, paymentMethod, paymentGatewayFee, confirmedBy, details, transactionTime }

  const httpResponse = pipe(
    data,
    invoicePaymentPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      invoicePaymentService(invoicePaymentDB)(findBillByIdDB)(updateEventDateDB),
      TE.map(({ invoice, bill }) => {
        invoicePaymentReportUseCase({ invoice, bill })()

        return ok(invoice)
      })
    ))
  )

  return httpResponse
}
