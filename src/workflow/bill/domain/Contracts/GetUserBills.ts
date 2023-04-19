import { GetUserBillsProps } from '@bill/domain/requiredFields/get-user-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
}

export type GetUserBillsPropsValidator = (data: Data) => E.Either<ValidationError, GetUserBillsProps>

export type GetUserBillsDB = (data: GetUserBillsProps) => Promise<Bill[]>

export type GetUserBillsService = (db: GetUserBillsDB) =>
(data: GetUserBillsProps) => TE.TaskEither<HttpErrorResponse, Bill[]>
