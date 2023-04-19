import { GetClientBillsProps } from '@bill/domain/requiredFields/get-client-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
}

export type GetClientBillsPropsValidator = (data: Data) => E.Either<ValidationError, GetClientBillsProps>

export type GetClientBillsDB = (data: GetClientBillsProps) => Promise<ViewBill[]>

export type GetClientBillsService = (db: GetClientBillsDB) =>
(data: GetClientBillsProps) => TE.TaskEither<HttpErrorResponse, ViewBill[]>
