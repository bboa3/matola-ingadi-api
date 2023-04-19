import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { EventDate } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetEventDatesDB = () => Promise<EventDate[]>

export type GetEventDatesService = (db: GetEventDatesDB) =>
TE.TaskEither<HttpErrorResponse, EventDate[]>
