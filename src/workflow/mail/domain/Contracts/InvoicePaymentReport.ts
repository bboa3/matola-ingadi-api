import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface InvoicePaymentReportProps {
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

export type InvoicePaymentReportSend = (data: SendProps) => Promise<void>

export type InvoicePaymentReportService = (db: InvoicePaymentReportSend)
=> (data: InvoicePaymentReportProps) => TE.TaskEither<HttpErrorResponse, void>

export type InvoicePaymentReportUseCase = (data: InvoicePaymentReportProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
