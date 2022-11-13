import { getPaymentMethodDB } from '@bill/domain/entities/get-payment-method'
import { getPaymentMethodService } from '@bill/services/get-payment-method'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getPaymentMethodUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getPaymentMethodService(getPaymentMethodDB),
    TE.map(method => {
      return ok(method)
    })
  )

  return httpResponse
}
