import { DeleteEventDateDB } from '@bill/domain/Contracts/DeleteEventDate'
import { FindBillsDB } from '@bill/domain/Contracts/FindBills'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
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
=> (db: DeleteEventDateDB) => (db: FindBillsDB) => TE.TaskEither<HttpErrorResponse, void>
