import { GetUserInvoicesProps } from '@bill/domain/requiredFields/get-user-invoices'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Invoice } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
  maxNumber: number
}

export type GetUserInvoicesPropsValidator = (data: Data) => E.Either<ValidationError, GetUserInvoicesProps>

export type GetUserInvoicesDB = (data: GetUserInvoicesProps) => Promise<Invoice[]>

export type GetUserInvoicesService = (db: GetUserInvoicesDB) =>
(data: GetUserInvoicesProps) => TE.TaskEither<HttpErrorResponse, Invoice[]>
