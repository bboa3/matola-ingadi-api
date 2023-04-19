import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface DisableBillReportProps {
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

export type DisableBillReportSend = (data: SendProps) => Promise<void>

export type DisableBillReportService = (db: DisableBillReportSend)
=> (data: DisableBillReportProps) => TE.TaskEither<HttpErrorResponse, void>

export type DisableBillReportUseCase = (data: DisableBillReportProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
