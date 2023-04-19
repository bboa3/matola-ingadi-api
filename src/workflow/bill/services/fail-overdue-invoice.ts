import { FailOverdueInvoiceService } from '@bill/domain/Contracts/FailOverdueInvoice'
import { failOverdueInvoice } from '@bill/services/invoice/overdue/fail-overdue-invoice'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const failOverdueInvoiceService: FailOverdueInvoiceService = (failOverdueInvoiceDB) => (disableBillReportUseCase) => (invoicePaymentProducerUseCase) => (findBillsDB) => {
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
          const { updatedInvoices, isOverdueInvoice } = failOverdueInvoice(invoices)

          if (isOverdueInvoice) {
            await failOverdueInvoiceDB({
              id: bill.id,
              invoices: updatedInvoices,
              status: 'DISABLED'
            })
          }

          const invoice = updatedInvoices[updatedInvoices.length - 1]

          disableBillReportUseCase({
            bill,
            invoice
          })()

          invoicePaymentProducerUseCase({
            bill,
            invoice
          })()
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
