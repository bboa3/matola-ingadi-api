import { FindBillsDB } from '@bill/domain/Contracts/FindBills'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { InvoicePaymentProducerUseCase } from '@eventStream/domain/Contracts/InvoicePaymentProducer'
import { DisableBillReportUseCase } from '@mail/domain/Contracts/DisableBillReport'
import { BillStatus, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

interface FailOverdueInvoiceProps {
  id: string
  invoices: Invoice[]
  status: BillStatus
}

export type FailOverdueInvoiceDB = (data: FailOverdueInvoiceProps) => Promise<void>

export type FailOverdueInvoiceService = (db: FailOverdueInvoiceDB) => (report: DisableBillReportUseCase)
=> (producer: InvoicePaymentProducerUseCase) => (db: FindBillsDB) => TE.TaskEither<HttpErrorResponse, void>
