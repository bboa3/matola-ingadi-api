import { findBillsDB } from '@bill/domain/entities/find-bills'
import { overdueInvoiceService } from '@bill/services/overdue-invoice'
import { overdueInvoiceReportUseCase } from '@mail/useCases/overdue-invoice-report'
import { pipe } from 'fp-ts/lib/function'

export const overdueInvoiceUseCase = () => {
  const httpResponse = pipe(
    overdueInvoiceService(overdueInvoiceReportUseCase)(findBillsDB)
  )

  return httpResponse
}
