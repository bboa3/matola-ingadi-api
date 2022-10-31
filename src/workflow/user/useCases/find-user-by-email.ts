import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { findUserByEmailDB } from '@user/domain/entities/find-user-by-email'
import { findUserByEmailService } from '@user/services/find-user-by-email'
import { findUserByEmailPropsValidator } from '@user/services/validate/find-user-by-email'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const findUserByEmailUseCase: Middleware = (_httpRequest, httpBody) => {
  const { email } = httpBody

  const data = { email }

  const httpResponse = pipe(
    data,
    findUserByEmailPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      findUserByEmailService(findUserByEmailDB),
      TE.map(user => {
        return ok(user)
      })
    ))
  )

  return httpResponse
}
