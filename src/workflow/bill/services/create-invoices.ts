import { CreateInvoicesService } from '@bill/domain/Contracts/CreateInvoice'
import { totalCalculator } from '@bill/services/invoice/calculator/total'
import { splitInvoiceTransaction } from '@bill/services/invoice/split-invoice-transaction'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound, tooMany } from '@core/infra/middleware/http_error_response'
import { createDateUTC } from '@utils/date'
import { Invoice } from 'billing'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createEnvices: CreateInvoicesService = (createInvoiceNumberDB) => (getPricingDB) => (reserveEventDateDB) => (data) => {
  const { pricingId, guestsNumber, eventDate, eventType, paymentMethod } = data
  const now = createDateUTC().format()

  return pipe(
    TE.tryCatch(
      async () => await getPricingDB({ id: pricingId, locale: 'pt' }),

      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(pricing => TE.tryCatch(
      async () => {
        const invoiceCode = await createInvoiceNumberDB()
        const services = pricing.services.map(({ description }) => description)

        const { total, subTotal, discounted } = totalCalculator({ pricing, guestsNumber })

        const transactions = splitInvoiceTransaction({
          total,
          eventDate,
          paymentMethod
        })

        const invoice: Invoice = {
          invoiceCode,
          activity: pricing.activity,
          eventDate,
          eventType,
          pricingId: pricing.id,
          guestsNumber,
          subTotal,
          discounted,
          total,
          invoiceStatus: 'PENDING',
          transactions,
          services,
          createdAt: now,
          updatedAt: now
        }

        await reserveEventDateDB({
          invoiceCode,
          status: 'PENDING',
          date: eventDate
        })

        return invoice
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        if (err.name === 'EntityAlreadyExistError') {
          return tooMany(err)
        }

        console.log(err)
        return fail(err)
      }
    ))
  )
}
