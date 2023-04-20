import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface OverdueInvoiceReportProps {
  bill: Bill
  invoice: Invoice
}

interface SendProps {
  email: string
  html: string
  transactionsPaths: string[]
  dueAt: string
  activity: Activity
  invoiceCode: string
}

export type OverdueInvoiceReportSend = (data: SendProps) => Promise<void>

export type OverdueInvoiceReportService = (db: OverdueInvoiceReportSend)
=> (data: OverdueInvoiceReportProps) => TE.TaskEither<HttpErrorResponse, void>

export type OverdueInvoiceReportUseCase = (data: OverdueInvoiceReportProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
