import { getBillDB } from '@bill/domain/entities/get-bill'
import { getBillService } from '@bill/services/get-bill'
import { getBillPropsValidator } from '@bill/services/validate/get-bill'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getBillUseCase: Middleware = (httpRequest, _httpBody) => {
  const clientId = '634f1481440e32a71252fab0'
  const { id } = httpRequest.params

  const data = { id, clientId }

  const httpResponse = pipe(
    data,
    getBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      getBillService(getBillDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
