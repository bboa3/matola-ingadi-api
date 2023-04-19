import { GetInvoiceService } from '@bill/domain/Contracts/GetInvoice'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getInvoiceService: GetInvoiceService = (getInvoiceDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => await getInvoiceDB(data),
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
