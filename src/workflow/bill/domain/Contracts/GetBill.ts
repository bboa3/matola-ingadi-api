import { GetBillProps } from '@bill/domain/requiredFields/get-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { ViewBill } from 'ingadi'

interface Data {
  id: string
  clientId: string
}

export type GetBillPropsValidator = (data: Data) => E.Either<ValidationError, GetBillProps>

export type GetBillDB = (data: GetBillProps) => Promise<ViewBill>

export type GetBillService = (db: GetBillDB) =>
(data: GetBillProps) => TE.TaskEither<HttpErrorResponse, ViewBill>
