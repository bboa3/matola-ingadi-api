import { GetClientBillsService } from '@bill/domain/Contracts/GetClientBills'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getClientBillsService: GetClientBillsService = (getClientBillsDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => await getClientBillsDB(data),
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )
  )
}
