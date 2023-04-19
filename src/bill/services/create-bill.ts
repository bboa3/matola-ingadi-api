import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { eventPriceCalculator } from '@bill/services/calculator/event-price-calculator'
import { createEnvices } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { clientError, fail, notFound } from '@core/infra/middleware/http_error_response'
import { Id } from '@user/domain/requiredFields/id'
import { Bill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceIdDB) => (reserveEventDateDB) => (findActiveBillsDB) => (data) => {
  const { userId, eventPricingId, guestsNumber, eventType, eventDate } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = getEventPricing(eventPricingId)

        const user = await findActiveBillsDB({ id: userId as unknown as Id })

        if (!pricing) {
          throw new EntityNotFoundError()
        }

        const service = eventPriceCalculator({ pricing, guestsNumber, eventType, eventDate })

        return { service, user }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ service, user }) => {
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
              userName: user.name!,
              services: service,
              discount: 0,
              subTotal,
              total,
              invoices,
              status: 'ACTIVE'
            }

            return { bill, user }
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
    TE.chain(({ bill, user }) => TE.tryCatch(
      async () => {
        const newBill = await createBillDB(bill)
        await reserveEventDateDB({
          date: eventDate,
          billId: newBill.id
        })

        return { bill: newBill, user }
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
