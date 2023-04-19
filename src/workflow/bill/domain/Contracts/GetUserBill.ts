import { GetUserBillProps } from '@bill/domain/requiredFields/get-user-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  id: string
  userId: string
}

export type GetUserBillPropsValidator = (data: Data) => E.Either<ValidationError, GetUserBillProps>

export type GetUserBillDB = (data: GetUserBillProps) => Promise<Bill>

export type GetUserBillService = (db: GetUserBillDB) =>
(data: GetUserBillProps) => TE.TaskEither<HttpErrorResponse, Bill>
