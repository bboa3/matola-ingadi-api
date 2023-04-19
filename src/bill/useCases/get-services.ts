import { getServicesDB } from '@bill/domain/entities/get-services'
import { getServicesService } from '@bill/services/get-services'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getServicesUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getServicesService(getServicesDB),
    TE.map(bill => {
      return ok(bill)
    })
  )

  return httpResponse
}
