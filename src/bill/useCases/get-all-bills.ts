import { getAllBillsDB } from '@bill/domain/entities/get-all-bills'
import { getAllBillsService } from '@bill/services/get-all-bills'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getAllBillsUseCase: Middleware = (_httpRequest, _httpBody) => {
  const httpResponse = pipe(
    getAllBillsService(getAllBillsDB),
    TE.map(bill => {
      return ok(bill)
    })
  )

  return httpResponse
}
