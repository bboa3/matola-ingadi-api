import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { eventPriceCalculator } from '@bill/services/calculator/event-price-calculator'
import { createEnvice } from '@bill/services/invoice/create-invoices'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Bill, PaymentMethodId } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (createInvoiceNumberDB) => (data) => {
  const { paymentMethodId, clientId, eventPricingId, numberOfGuests, eventType } = data

  const today = dayjs(new Date())
  const createdAt = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  const dueAt = today.add(4, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  return pipe(
    TE.tryCatch(
      async () => {
        const pricing = getEventPricing(eventPricingId)
        const newInvoiceNumber = await createInvoiceNumberDB()

        const event = eventPriceCalculator({ pricing, numberOfGuests, eventType })
        const eventTotal = event.total

        const subTotal = eventTotal
        const total = eventTotal

        const invoice = createEnvice({
          invoiceNumber: newInvoiceNumber,
          service: event,
          subTotal,
          total,
          paymentMethodId,
          dueAt,
          createdAt
        })

        const bill: Bill = {
          clientId,
          services: [event],
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
