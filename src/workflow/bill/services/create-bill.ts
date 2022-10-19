import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { eventPriceCalculator } from '@bill/services/calculator/event-price-calculator'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Bill } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (getEventPricingDB) => (data) => {
  const { clientId, eventPricingId, numberOfGuests, eventType } = data

  const today = dayjs(new Date())
  const createAt = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  const dueAt = today.add(3, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = await getEventPricingDB(eventPricingId)

        const event = eventPriceCalculator({ pricing, numberOfGuests, eventType })
        const eventTotal = event.total

        const bill: Bill = {
          clientId,
          createAt,
          dueAt,
          event,
          subTotal: eventTotal,
          discount: 0,
          total: eventTotal,
          confirmation: {
            status: 'PENDING'
          }
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
    ),
    TE.chain(data => TE.tryCatch(
      async () => await createBillDB(data),

      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ))
  )
}
