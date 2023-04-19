import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { ReservedEventDate } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetReservedDatesDB = () => Promise<ReservedEventDate[]>

export type GetReservedDatesService = (db: GetReservedDatesDB) =>
TE.TaskEither<HttpErrorResponse, ReservedEventDate[]>
