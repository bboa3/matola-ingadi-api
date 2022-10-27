import { CreateBillDocumentService } from '@bill/domain/Contracts/CreateBillDocument'
import { Id } from '@bill/domain/requiredFields/id'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { createDocument } from '@bill/services/doc/create-document'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillDocumentService: CreateBillDocumentService = (CreateBillDocumentDB) => (getClientByIdDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => await CreateBillDocumentDB(data),
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
        const { clientId, event: { eventPricingId } } = bill
        const client = await getClientByIdDB(clientId as Id)

        const eventPricing = getEventPricing(eventPricingId)

        if (!eventPricing) throw new EntityNotFoundError()

        return { client, bill, eventPricing }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )),
    TE.chain(({ bill, client, eventPricing }) => TE.tryCatch(
      async () => {
        const path = await createDocument({ bill, client, eventPricing })

        return path
      },
      (err: any) => {
        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
