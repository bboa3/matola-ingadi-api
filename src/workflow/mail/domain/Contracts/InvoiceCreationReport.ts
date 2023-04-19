import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface InvoiceCreationReportProps {
  bill: Bill
  invoice: Invoice
}

interface SendProps {
  email: string
  html: string
  invoicePath: string
  dueAt: string
  activity: Activity
  invoiceCode: string
}

export type InvoiceCreationReportSend = (data: SendProps) => Promise<void>

export type InvoiceCreationReportService = (db: InvoiceCreationReportSend)
=> (data: InvoiceCreationReportProps) => TE.TaskEither<HttpErrorResponse, void>

export type InvoiceCreationReportUseCase = (data: InvoiceCreationReportProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
