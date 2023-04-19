import { ok } from '@core/infra/middleware/http_success_response'
import { InvoicePaymentReportUseCase } from '@mail/domain/Contracts/InvoicePaymentReport'
import { invoicePaymentReportSend } from '@mail/domain/send/invoice-payment-report'
import { invoicePaymentReportService } from '@mail/services/invoice-payment-report'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoicePaymentReportUseCase: InvoicePaymentReportUseCase = (data) => {
  const httpResponse = pipe(
    data,
    invoicePaymentReportService(invoicePaymentReportSend),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
