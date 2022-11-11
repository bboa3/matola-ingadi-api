import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { eventPriceCalculator } from '@bill/services/calculator/event-price-calculator'
import { createEnvices } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { clientError, fail, notFound } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceIdDB) => (reserveEventDateDB) => (data) => {
  const { userId, eventPricingId, guestsNumber, eventType, eventDate } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = getEventPricing(eventPricingId)

        if (!pricing) {
          throw new EntityNotFoundError()
        }

        return eventPriceCalculator({ pricing, guestsNumber, eventType, eventDate })
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(service => {
      const eventTotal = service.total

      const subTotal = eventTotal
      const total = eventTotal

      return pipe(
        { service, total, eventDate },
        createEnvices(createInvoiceIdDB),
        TE.chain(invoices => TE.tryCatch(
          async () => {
            const bill: Bill = {
              userId,
              services: service,
              discount: 0,
              subTotal,
              total,
              invoices,
              status: 'ACTIVE'
            }

            return bill
          },
          (err: any) => {
            if (err.name === 'EntityNotFound') {
              return notFound(err)
            }

            console.log(err)
            return fail(new DatabaseFailError())
          }
        ))
      )
    }),
    TE.chain(data => TE.tryCatch(
      async () => {
        const newBill = await createBillDB(data)
        await reserveEventDateDB({
          date: eventDate,
          billId: newBill.id
        })

        return newBill
      },

      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        if (err.name === 'EntityAlreadyExist') {
          return clientError(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
