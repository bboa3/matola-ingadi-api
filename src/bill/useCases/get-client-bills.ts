import { getClientBillsDB } from '@bill/domain/entities/get-client-bills'
import { getClientBillsService } from '@bill/services/get-client-bills'
import { getClientBillsPropsValidator } from '@bill/services/validate/get-client-bills'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getClientBillsUseCase: Middleware = (httpRequest, httpBody) => {
  const { userId } = httpBody
  const data = { userId }

  const httpResponse = pipe(
    data,
    getClientBillsPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getClientBillsService(getClientBillsDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
