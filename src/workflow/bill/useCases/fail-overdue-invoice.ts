import { failOverdueInvoiceDB } from '@bill/domain/entities/fail-overdue-invoice'
import { findBillsDB } from '@bill/domain/entities/find-bills'
import { failOverdueInvoiceService } from '@bill/services/fail-overdue-invoice'
import { invoicePaymentProducerUseCase } from '@eventStream/useCases/invoice-payment-producer'
import { disableBillReportUseCase } from '@mail/useCases/disable-bill-report'
import { pipe } from 'fp-ts/lib/function'

export const failOverdueInvoiceUseCase = () => {
  const httpResponse = pipe(
    failOverdueInvoiceService(failOverdueInvoiceDB)(disableBillReportUseCase)(invoicePaymentProducerUseCase)(findBillsDB)
  )

  return httpResponse
}
