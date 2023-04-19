import { getEventDatesDB } from '@bill/domain/entities/get-event-dates'
import { getEventDatesService } from '@bill/services/get-event-dates'
import { getEventDatesPropsValidator } from '@bill/services/validate/get-event-dates'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getEventDatesUseCase: Middleware = (httpRequest, _httpBody) => {
  const { maxNumber } = httpRequest.params

  const httpResponse = pipe(
    { maxNumber: Number(maxNumber) },
    getEventDatesPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getEventDatesService(getEventDatesDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
