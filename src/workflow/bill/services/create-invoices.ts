import { CreateInvoicesService } from '@bill/domain/Contracts/CreateInvoice'
import { totalCalculator } from '@bill/services/invoice/calculator/total'
import { createDueDate } from '@bill/services/utils/invoice-date'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { createDateUTC } from '@utils/date'
import { Invoice, Transaction } from 'billing'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { v4 } from 'uuid'

export const createEnvices: CreateInvoicesService = (createInvoiceNumberDB) => (getPricingDB) => (data) => {
  const { pricingId, guestsNumber, eventDate, eventType, paymentGatewayFee, paymentMethod } = data
  const now = createDateUTC().format()
  const dueAt = createDueDate()

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

        const { total, subTotal, discounted } = totalCalculator({ pricing, guestsNumber, paymentGatewayFee })

        const transaction: Transaction = {
          id: v4(),
          status: 'PENDING',
          paymentMethod,
          paymentGatewayFee,
          updatedAt: now,
          createdAt: now
        }

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
          transaction,
          services,
          dueAt: dueAt,
          createdAt: now,
          updatedAt: now
        }

        return invoice
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(err)
      }
    ))
  )
}
