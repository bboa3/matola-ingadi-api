import { FindBillByIdDB } from '@bill/domain/Contracts/FindBills'
import { UpdateEventDateDB } from '@bill/domain/Contracts/UpdateEventDate'
import { InvoicePaymentProps } from '@bill/domain/requiredFields/invoice-payment'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill, Invoice } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
  invoiceCode: string
  billId: string
  transactionId: string
  paymentMethod: string
  paymentGatewayFee: number
  confirmedBy: string
  details: string
  transactionTime: string
}

export type InvoicePaymentPropsValidator = (data: Data) => E.Either<ValidationError, InvoicePaymentProps>
export type InvoicePaymentDB = (data: Bill) => Promise<Bill>

export type InvoicePaymentService = (db: InvoicePaymentDB) => (db: FindBillByIdDB) => (db: UpdateEventDateDB)
=> (data: InvoicePaymentProps) => TE.TaskEither<HttpErrorResponse, { invoice: Invoice, bill: Bill}>
