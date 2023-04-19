import { getReservedDatesDB } from '@bill/domain/entities/get-reserved-dates'
import { getReservedDatesService } from '@bill/services/get-reserved-dates'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getReservedDatesUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getReservedDatesService(getReservedDatesDB),
    TE.map(dates => {
      return ok(dates)
    })
  )

  return httpResponse
}
