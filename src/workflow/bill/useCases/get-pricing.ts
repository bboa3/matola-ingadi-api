import { findPricingByIdDB } from '@bill/domain/entities/find-pricing-by-id'
import { getPricingService } from '@bill/services/get-pricing'
import { getPricingPropsValidator } from '@bill/services/validate/get-pricing'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getPricingUseCase: Middleware = (httpRequest, _httpBody) => {
  const { locale, id } = httpRequest.params

  const httpResponse = pipe(
    { locale, id },
    getPricingPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getPricingService(findPricingByIdDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
