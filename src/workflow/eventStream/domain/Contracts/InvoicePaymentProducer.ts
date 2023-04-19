import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { HttpSuccessResponse } from '@core/infra/middleware/http_success_response'
import { Activity, Bill, BillStatus, Invoice, InvoiceStatus } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export interface InvoicePaymentProducerProps {
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

export type InvoicePaymentProducerPublish = (data: PublishProps) => Promise<void>

export type InvoicePaymentProducerService = (db: InvoicePaymentProducerPublish)
=> (data: InvoicePaymentProducerProps) => TE.TaskEither<HttpErrorResponse, void>

export type InvoicePaymentProducerUseCase = (data: InvoicePaymentProducerProps) =>
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse>
