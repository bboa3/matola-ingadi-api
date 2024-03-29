import { InvoicePaymentService } from '@bill/domain/Contracts/InvoicePayment'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { createDateUTC } from '@utils/date'
import { Bill } from 'billing'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { updateInvoices } from './utils/invoice-payment'

export const invoicePaymentService: InvoicePaymentService = (invoicePaymentDB) => (findBillByIdDB) => (updateEventDateDB) => (data) => {
  const { billId } = data
  const now = createDateUTC().format()

  return pipe(
    TE.tryCatch(
      async () => {
        const found = await findBillByIdDB(billId)

        const { updatedInvoices, invoiceIndex, transaction } = updateInvoices({
          invoices: found.invoices,
          data
        })

        const invoice = updatedInvoices[invoiceIndex]

        const updatedBill: Bill = {
          ...found,
          status: 'ACTIVE',
          invoices: updatedInvoices,
          updatedAt: now
        }

        return { invoice, transaction, bill: updatedBill }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ bill, invoice, transaction }) => TE.tryCatch(
      async () => {
        await invoicePaymentDB(bill)

        await updateEventDateDB({
          invoiceCode: invoice.invoiceCode,
          status: 'RESERVED'
        })

        return { bill, invoice, transaction }
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
}
