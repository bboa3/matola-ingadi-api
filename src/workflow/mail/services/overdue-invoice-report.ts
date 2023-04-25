import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { OverdueInvoiceReportService } from '@mail/domain/Contracts/OverdueInvoiceReport'
import { createInvoiceDocument } from '@mail/services/doc/create-invoice'
import { createHtml } from '@mail/services/templetes/overdue-invoice-report'
import { findTransaction } from '@mail/services/utils/find-transaction'
import { getMonths } from '@utils/date/months'
import * as TE from 'fp-ts/lib/TaskEither'

const { months, dateLocalizer } = getMonths('pt')

export const overdueInvoiceReportService: OverdueInvoiceReportService = (overdueInvoiceReportSend) => ({ bill, invoice }) => {
  const { id, name, email, activity } = bill
  const { invoiceCode, transactions, eventDate: eventAt, eventType, guestsNumber } = invoice
  const reservationTransaction = findTransaction({ transactions, transactionType: 'date-reservation' })
  const { dueAt: dueDate } = reservationTransaction

  const eventDate = dateLocalizer(eventAt, months)
  const dueAt = dateLocalizer(dueDate, months)

  return TE.tryCatch(
    async () => {
      const html = createHtml({
        name,
        email,
        invoiceCode,
        dueAt,
        activityName: activity.name,
        billId: id,
        eventType,
        guestsNumber,
        eventDate
      })

      const transactionsPaths: string[] = []

      for (const transaction of transactions) {
        const path = await createInvoiceDocument({ bill, invoice, transaction })

        transactionsPaths.push(path)
      }

      await overdueInvoiceReportSend({ html, dueAt, activity, email, transactionsPaths, invoiceCode })
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
