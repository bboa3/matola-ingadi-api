import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { findUserByIdDB } from '@user/domain/entities/find-user-by-id'
import { findUserByIdService } from '@user/services/find-user-by-id'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const findUserByIdUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const data = { id: userId }

  const httpResponse = pipe(
    data,
    findUserByIdService(findUserByIdDB),
    TE.map(user => {
      return ok(user)
    })
  )

  return httpResponse
}
