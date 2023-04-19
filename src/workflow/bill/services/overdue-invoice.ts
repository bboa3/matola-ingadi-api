import { OverdueInvoiceService } from '@bill/domain/Contracts/OverdueInvoice'
import { findOverdueInvoice } from '@bill/services/invoice/overdue/overdue-invoice'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const overdueInvoiceService: OverdueInvoiceService = (overdueInvoiceReportUseCase) => (findBillsDB) => {
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
          const overdueInvoice = findOverdueInvoice(invoices)

          if (overdueInvoice) {
            overdueInvoiceReportUseCase({
              bill,
              invoice: overdueInvoice
            })()
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
