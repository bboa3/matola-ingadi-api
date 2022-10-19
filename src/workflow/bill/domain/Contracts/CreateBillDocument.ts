import { CreateBillDocumentProps } from '@bill/domain/requiredFields/create-bill-document'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  id: string
  clientId: string
}

export type CreateBillDocumentPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillDocumentProps>

export type CreateBillDocumentDB = (data: CreateBillDocumentProps) => Promise<ViewBill>

export type CreateBillDocumentService = (db: CreateBillDocumentDB) =>
(data: CreateBillDocumentProps) => TE.TaskEither<HttpErrorResponse, ViewBill>
