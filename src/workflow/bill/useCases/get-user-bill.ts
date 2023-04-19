import { getUserBillDB } from '@bill/domain/entities/get-user-bill'
import { getUserBillService } from '@bill/services/get-user-bill'
import { getUserBillPropsValidator } from '@bill/services/validate/get-user-bill'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getUserBillUseCase: Middleware = (httpRequest, httpBody) => {
  const { userId } = httpBody
  const { id } = httpRequest.params

  const data = { id, userId }

  const httpResponse = pipe(
    data,
    getUserBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getUserBillService(getUserBillDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
