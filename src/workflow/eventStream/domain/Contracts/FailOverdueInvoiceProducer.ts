import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, BillStatus, Invoice, InvoiceStatus } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface FailOverdueInvoiceProducerProps {
  bill: Bill
  invoice: Invoice
}

interface PublishProps {
  billId: string
  userId: string
  invoiceCode: string
  invoiceStatus: InvoiceStatus
  activity: Activity
  billStatus: BillStatus
  plan: string
  maxTeamMembers: number
  subTotal: number
  total: number
  nextInvoiceDate: string
}

export type FailOverdueInvoiceProducerPublish = (data: PublishProps) => Promise<void>

export type FailOverdueInvoiceProducerService = (db: FailOverdueInvoiceProducerPublish)
=> (data: FailOverdueInvoiceProducerProps) => TE.TaskEither<HttpErrorResponse, void>

export type FailOverdueInvoiceProducerUseCase = (data: FailOverdueInvoiceProducerProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
