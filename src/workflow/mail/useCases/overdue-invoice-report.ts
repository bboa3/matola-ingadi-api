import { ok } from '@core/infra/middleware/http_success_response'
import { OverdueInvoiceReportUseCase } from '@mail/domain/Contracts/OverdueInvoiceReport'
import { overdueInvoiceReportSend } from '@mail/domain/send/overdue-invoice-report'
import { overdueInvoiceReportService } from '@mail/services/overdue-invoice-report'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const overdueInvoiceReportUseCase: OverdueInvoiceReportUseCase = (data) => {
  const httpResponse = pipe(
    data,
    overdueInvoiceReportService(overdueInvoiceReportSend),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
