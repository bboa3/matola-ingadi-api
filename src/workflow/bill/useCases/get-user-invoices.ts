import { getUserInvoicesDB } from '@bill/domain/entities/get-user-invoices'
import { getUserInvoicesService } from '@bill/services/get-user-invoices'
import { getUserInvoicesPropsValidator } from '@bill/services/validate/get-user-invoices'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getUserInvoicesUseCase: Middleware = (httpRequest, httpBody) => {
  const { userId } = httpBody
  const { maxNumber } = httpRequest.params

  const data = { maxNumber: Number(maxNumber), userId }

  const httpResponse = pipe(
    data,
    getUserInvoicesPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getUserInvoicesService(getUserInvoicesDB),
      TE.map(result => ok(result))
    ))
  )

  return httpResponse
}
