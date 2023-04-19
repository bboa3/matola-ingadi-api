import { GetInvoiceProps } from '@bill/domain/requiredFields/get-invoice'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Invoice } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  billId: string
  invoiceCode: string
  userId: string
}

export type GetInvoicePropsValidator = (data: Data) => E.Either<ValidationError, GetInvoiceProps>

export type GetInvoiceDB = (data: GetInvoiceProps) => Promise<Invoice>

export type GetInvoiceService = (db: GetInvoiceDB) =>
(data: GetInvoiceProps) => TE.TaskEither<HttpErrorResponse, Invoice>
