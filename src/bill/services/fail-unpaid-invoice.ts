import { FailUnpaidInvoiceService } from '@bill/domain/Contracts/FailUnpaidInvoice'
import { isDueDate } from '@bill/services/utils/is-due-date'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { InvoiceStatus, ViewBill } from 'bill'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const failUnpaidInvoiceService: FailUnpaidInvoiceService = (updateBillDB) => (findActiveBillsDB) => {
  return pipe(
    TE.tryCatch(
      async () => await findActiveBillsDB(),
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
        const newBills: ViewBill[] = []

        for (const bill of bills) {
          const { invoices } = bill
          let updated = false

          const newInvoices = invoices.map(invoice => {
            const { status, dueAt } = invoice
            const dueInvoice = isDueDate({ dueAt })

            if (status === 'PENDING' && dueInvoice) {
              updated = true
              const newStatus: InvoiceStatus = 'FAILED'

              return {
                ...invoice,
                status: newStatus
              }
            }

            return { ...invoice, status }
          })

          if (updated) {
            newBills.push({
              ...bill,
              invoices: newInvoices
            })
          }
        }

        for (const updatedBill of newBills) {
          await updateBillDB(updatedBill)
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
