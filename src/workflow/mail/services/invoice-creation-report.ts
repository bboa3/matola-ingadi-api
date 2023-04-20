import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { InvoiceCreationReportService } from '@mail/domain/Contracts/InvoiceCreationReport'
import { createInvoiceDocument } from '@mail/services/doc/create-invoice'
import { createHtml } from '@mail/services/templetes/invoice-creation-report'
import { findTransaction } from '@mail/services/utils/find-transaction'
import { getMonths } from '@utils/date/months'
import * as TE from 'fp-ts/lib/TaskEither'

const { months, dateLocalizer } = getMonths('pt')

export const invoiceCreationReportService: InvoiceCreationReportService = (invoiceCreationReportSend) => ({ bill, invoice }) => {
  const { name, email, activity } = bill
  const { invoiceCode, transactions } = invoice
  const reservationTransaction = findTransaction(transactions, 'date-reservation')
  const { dueAt: dueDate } = reservationTransaction

  const dueAt = dateLocalizer(dueDate, months)

  return TE.tryCatch(
    async () => {
      const html = createHtml({
        name,
        email,
        invoiceCode,
        dueAt,
        activityName: activity.name
      })

      const transactionsPaths: string[] = []

      for (const transaction of transactions) {
        const path = await createInvoiceDocument({ bill, invoice, transaction })

        transactionsPaths.push(path)
      }

      await invoiceCreationReportSend({ html, dueAt, activity, email, transactionsPaths, invoiceCode })
    },

    (err: any) => {
      if (err.name === 'EntityNotFound') {
        return notFound(err)
      }

      console.log(err)
      return fail(new DatabaseFailError())
    }
  )
}
