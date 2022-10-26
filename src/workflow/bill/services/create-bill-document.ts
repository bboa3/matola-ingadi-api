import { CreateBillDocumentService } from '@bill/domain/Contracts/CreateBillDocument'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { createDocument } from './doc/create-document'

export const createBillDocumentService: CreateBillDocumentService = (CreateBillDocumentDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const bill = await CreateBillDocumentDB(data)

        return bill
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(bill => TE.tryCatch(
      async () => {
        const path = await createDocument({ bill })

        return path
      },
      (err: any) => {
        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}