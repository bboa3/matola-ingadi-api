import { CreateBillDocumentService } from '@bill/domain/Contracts/CreateBillDocument'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { createInvoiceDocument } from '@bill/services/doc/create-document'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createInvoiceDocumentService: CreateBillDocumentService = (getInvoiceDB) => (getClientByIdDB) => (data) => {
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
    ),
    TE.chain(invoice => TE.tryCatch(
      async () => {
        const { service: { eventPricingId } } = invoice
        const user = await getClientByIdDB(data.userId)

        const eventPricing = getEventPricing(eventPricingId)

        if (!eventPricing) throw new EntityNotFoundError()

        return { user, invoice, eventPricing }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )),
    TE.chain(({ invoice, user, eventPricing }) => TE.tryCatch(
      async () => await createInvoiceDocument({ invoice, user, eventPricing }),
      (err: any) => {
        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
