import { GetEventDatesPropsValidator } from '@bill/domain/Contracts/GetEventDates'
import { GetEventDatesPropsCodec } from '@bill/domain/requiredFields/get-event-dates'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getEventDatesPropsValidator: GetEventDatesPropsValidator = (data) => {
  return pipe(
    data,
    GetEventDatesPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
