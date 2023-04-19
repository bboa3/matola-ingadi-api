import { GetEventDatesProps } from '@bill/domain/requiredFields/get-event-dates'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { EventDate } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  maxNumber: number
}

export type GetEventDatesPropsValidator = (data: Data) => E.Either<ValidationError, GetEventDatesProps>

export type GetEventDatesDB = (data: GetEventDatesProps) => Promise<EventDate[]>

export type GetEventDatesService = (db: GetEventDatesDB) => (data: GetEventDatesProps) =>
TE.TaskEither<HttpErrorResponse, EventDate[]>
