import { createBillDB } from '@bill/domain/entities/create-bill'
import { getEventPricingDB } from '@bill/domain/entities/get-event-pricing'
import { createBillService } from '@bill/services/create-bill'
import { createBillPropsValidator } from '@bill/services/validate/create-bill'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { paymentMethod, clientId, numberOfGuests, discount, eventPricingId, eventType } = httpBody

  const data = { paymentMethod, clientId, numberOfGuests, discount, eventPricingId, eventType }

  const httpResponse = pipe(
    data,
    createBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createBillService(createBillDB)(getEventPricingDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
