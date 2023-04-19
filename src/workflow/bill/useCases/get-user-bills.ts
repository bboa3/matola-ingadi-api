import { getUserBillsDB } from '@bill/domain/entities/get-user-bills'
import { getUserBillsService } from '@bill/services/get-user-bills'
import { getUserBillsPropsValidator } from '@bill/services/validate/get-user-bills'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getUserBillsUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const data = { userId }

  const httpResponse = pipe(
    data,
    getUserBillsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getUserBillsService(getUserBillsDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
