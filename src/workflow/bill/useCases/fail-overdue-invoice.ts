import { deleteEventDateDB } from '@bill/domain/entities/delete-reserve-event-date'
import { failOverdueInvoiceDB } from '@bill/domain/entities/fail-overdue-invoice'
import { findBillsDB } from '@bill/domain/entities/find-bills'
import { failOverdueInvoiceService } from '@bill/services/fail-overdue-invoice'
import { disableBillReportUseCase } from '@mail/useCases/disable-bill-report'
import { pipe } from 'fp-ts/lib/function'

export const failOverdueInvoiceUseCase = () => {
  const httpResponse = pipe(
    failOverdueInvoiceService(failOverdueInvoiceDB)(disableBillReportUseCase)(deleteEventDateDB)(findBillsDB)
  )

  return httpResponse
}
