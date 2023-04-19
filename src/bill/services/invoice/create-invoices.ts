import { CreateInvoicesService } from '@bill/domain/Contracts/CreateInvoiceNumber'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Invoice } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createEnvices: CreateInvoicesService = (createInvoiceNumberDB) => (data) => {
  const { service, total, eventDate } = data

  return pipe(
    TE.tryCatch(
      async () => {
        const today = dayjs(new Date())
        const todayFormatted = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')

        const invoice1DueAt = today.add(3, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        const invoice1Id = await createInvoiceNumberDB()
        const invoice1SubTotal = total * 10 / 100

        const invoice1: Invoice = {
          invoiceId: invoice1Id,
          service,
          subTotal: invoice1SubTotal,
          discount: 0,
          total: invoice1SubTotal,
          status: 'PENDING',
          dueAt: invoice1DueAt,
          createdAt: todayFormatted
        }

        const invoice2DueAt = dayjs(eventDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
        const invoice2Id = await createInvoiceNumberDB()
        const invoice2Subtotal = total * 90 / 100

        const invoice2: Invoice = {
          invoiceId: invoice2Id,
          service,
          subTotal: invoice2Subtotal,
          discount: 0,
          total: invoice2Subtotal,
          status: 'PENDING',
          dueAt: invoice2DueAt,
          createdAt: todayFormatted
        }

        return [invoice1, invoice2]
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(err)
      }
    )
  )
}
