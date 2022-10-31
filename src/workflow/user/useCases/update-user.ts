import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { updateUserDB } from '@user/domain/entities/update-user'
import { updateUserService } from '@user/services/update-user'
import { updateUserPropsValidator } from '@user/services/validate/update-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateUserUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, name, phoneNumber, image, address } = httpBody

  const data = { userId, name, phoneNumber, image, address }

  const httpResponse = pipe(
    data,
    updateUserPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      updateUserService(updateUserDB),
      TE.map(user => {
        return ok(user)
      })
    ))
  )

  return httpResponse
}
