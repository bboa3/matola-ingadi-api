import { CreateBillDocumentProps } from '@bill/domain/requiredFields/create-bill-document'
import { Id } from '@bill/domain/requiredFields/id'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { Client } from 'ingadi'

interface Data {
  id: string
  clientId: string
}

export type CreateBillDocumentPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillDocumentProps>

export type GetClientByIdDB = (id: Id) => Promise<Client>

export type CreateBillDocumentDB = (data: CreateBillDocumentProps) => Promise<ViewBill>

export type CreateBillDocumentService = (db: CreateBillDocumentDB) => (db: GetClientByIdDB) =>
(data: CreateBillDocumentProps) => TE.TaskEither<HttpErrorResponse, Uint8Array>
