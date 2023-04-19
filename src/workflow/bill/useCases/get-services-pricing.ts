import { getServicesPricingDB } from '@bill/domain/entities/get-services-pricing'
import { getServicesPricingService } from '@bill/services/get-services-pricing'
import { getServicesPricingPropsValidator } from '@bill/services/validate/get-services-pricing'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getServicesPricingUseCase: Middleware = (httpRequest, _httpBody) => {
  const { locale } = httpRequest.params

  const httpResponse = pipe(
    { locale },
    getServicesPricingPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getServicesPricingService(getServicesPricingDB),
      TE.map(result => {
        return ok(result)
      })
    ))
  )

  return httpResponse
}
