import { FailOverdueInvoiceService } from '@bill/domain/Contracts/FailOverdueInvoice'
import { failOverdueInvoice } from '@bill/services/invoice/overdue/fail-overdue-invoice'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const failOverdueInvoiceService: FailOverdueInvoiceService = (failOverdueInvoiceDB) => (disableBillReportUseCase) => (deleteEventDateDB) => (findBillsDB) => {
  return pipe(
    TE.tryCatch(
      async () => await findBillsDB(),
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(bills => TE.tryCatch(
      async () => {
        for (const bill of bills) {
          const { invoices } = bill
          const overdueInvoice = failOverdueInvoice(invoices)

          if (overdueInvoice) {
            const { invoice, invoiceIndex } = overdueInvoice
            invoices[invoiceIndex] = invoice

            await failOverdueInvoiceDB({
              id: bill.id,
              invoices,
              status: 'ACTIVE'
            })

            disableBillReportUseCase({
              bill,
              invoice
            })()

            await deleteEventDateDB({
              invoiceCode: invoice.invoiceCode
            })
          }
        }
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
