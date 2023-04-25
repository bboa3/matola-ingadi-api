import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { DisableBillReportService } from '@mail/domain/Contracts/DisableBillReport'
import { createInvoiceDocument } from '@mail/services/doc/create-invoice'
import { createHtml } from '@mail/services/templetes/invoice-creation-report'
import { findTransaction } from '@mail/services/utils/find-transaction'
import { getMonths } from '@utils/date/months'
import * as TE from 'fp-ts/lib/TaskEither'

const { months, dateLocalizer } = getMonths('pt')

export const disableBillReportService: DisableBillReportService = (disableBillReportSend) => ({ bill, invoice }) => {
  const { name, email, activity } = bill
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
        eventType,
        guestsNumber,
        eventDate
      })

      const transactionsPaths: string[] = []

      for (const transaction of transactions) {
        const path = await createInvoiceDocument({ bill, invoice, transaction })

        transactionsPaths.push(path)
      }

      await disableBillReportSend({ html, dueAt, activity, email, transactionsPaths, invoiceCode })
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
