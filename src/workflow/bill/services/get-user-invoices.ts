import { GetUserInvoicesService } from '@bill/domain/Contracts/GetUserInvoices'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getUserInvoicesService: GetUserInvoicesService = (getUserInvoicesDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => await getUserInvoicesDB(data),
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
