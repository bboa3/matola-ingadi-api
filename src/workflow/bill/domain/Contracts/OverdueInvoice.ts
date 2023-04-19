import { FindBillsDB } from '@bill/domain/Contracts/FindBills'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { OverdueInvoiceReportUseCase } from '@mail/domain/Contracts/OverdueInvoiceReport'
import { BillStatus, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

interface OverdueInvoiceProps {
  id: string
  invoices: Invoice[]
  status: BillStatus
}

export type OverdueInvoiceDB = (data: OverdueInvoiceProps) => Promise<void>

export type OverdueInvoiceService = (report: OverdueInvoiceReportUseCase)
=> (db: FindBillsDB) => TE.TaskEither<HttpErrorResponse, void>
