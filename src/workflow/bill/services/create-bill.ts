import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { eventPriceCalculator } from '@bill/services/calculator/event-price-calculator'
import { createEnvice } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError, EntityNotFoundError } from '@core/domain/errors/domain_error'
import { clientError, fail, notFound } from '@core/infra/middleware/http_error_response'
import { Bill, PaymentMethodId } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceNumberDB) => (reserveEventDateDB) => (data) => {
  const { paymentMethodId, userId, eventPricingId, numberOfGuests, eventType, eventDate } = data

  const today = dayjs(new Date())
  const createdAt = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  const dueAt = today.add(4, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = getEventPricing(eventPricingId)
        const newInvoiceId = await createInvoiceNumberDB()

        if (!pricing) {
          throw new EntityNotFoundError()
        }

        const event = eventPriceCalculator({ pricing, numberOfGuests, eventType, eventDate })
        const eventTotal = event.total

        const subTotal = eventTotal
        const total = eventTotal

        const invoice = createEnvice({
          invoiceId: newInvoiceId,
          service: event,
          subTotal,
          total,
          paymentMethodId,
          dueAt,
          createdAt
        })

        const bill: Bill = {
          userId,
          services: event,
          discount: 0,
          subTotal,
          total,
          invoices: [invoice],
          status: 'ACTIVE',
          defaultPaymentMethodId: paymentMethodId as PaymentMethodId,
          createdAt
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
