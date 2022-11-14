import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ViewBill } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetAllBillsDB = () => Promise<ViewBill[]>

export type GetAllBillsService = (db: GetAllBillsDB) => TE.TaskEither<HttpErrorResponse, ViewBill[]>
