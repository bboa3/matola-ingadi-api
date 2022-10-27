import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ViewBill } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

// export type GetLastCreatedBillPropsValidator = (data: Data) => E.Either<ValidationError, GetLastCreatedBillProps>

export type GetLastCreatedBillDB = () => Promise<ViewBill>

export type GetLastCreatedBillService = (db: GetLastCreatedBillDB) =>
() => TE.TaskEither<HttpErrorResponse, ViewBill>
