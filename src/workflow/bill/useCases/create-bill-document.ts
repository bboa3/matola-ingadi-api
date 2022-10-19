import { createBillDocumentDB } from '@bill/domain/entities/create-bill-document'
import { createBillDocumentService } from '@bill/services/create-bill-document'
import { createBillDocumentPropsValidator } from '@bill/services/validate/create-bill-document'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillDocumentUseCase: Middleware = (httpRequest, _httpBody) => {
  const clientId = '634f1481440e32a71252fab0'
  const { id } = httpRequest.params

  const data = { id, clientId }

  const httpResponse = pipe(
    data,
    createBillDocumentPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createBillDocumentService(createBillDocumentDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
