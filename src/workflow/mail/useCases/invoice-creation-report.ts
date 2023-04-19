import { ok } from '@core/infra/middleware/http_success_response'
import { InvoiceCreationReportUseCase } from '@mail/domain/Contracts/InvoiceCreationReport'
import { invoiceCreationReportSend } from '@mail/domain/send/invoice-creation-report'
import { invoiceCreationReportService } from '@mail/services/invoice-creation-report'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoiceCreationReportUseCase: InvoiceCreationReportUseCase = (data) => {
  const httpResponse = pipe(
    data,
    invoiceCreationReportService(invoiceCreationReportSend),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
