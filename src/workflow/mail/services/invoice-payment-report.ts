import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { InvoicePaymentReportService } from '@mail/domain/Contracts/InvoicePaymentReport'
import { createInvoiceDocument } from '@mail/services/doc/create-invoice'
import { createHtml } from '@mail/services/templetes/invoice-payment-report'
import { getMonths } from '@utils/date/months'
import * as TE from 'fp-ts/lib/TaskEither'

const { months, dateLocalizer } = getMonths('pt')

export const invoicePaymentReportService: InvoicePaymentReportService = (InvoicePaymentReportSend) => ({ bill, invoice, transaction }) => {
  const { name, email, activity } = bill
  const { invoiceCode, transactions, eventDate: eventAt, eventType } = invoice
  const { dueAt: dueDate, invoicePercentage } = transaction

  const dueAt = dateLocalizer(dueDate, months)
  const eventDate = dateLocalizer(eventAt, months)

  return TE.tryCatch(
    async () => {
      const html = createHtml({
        name,
        email,
        invoiceCode,
        dueAt,
        activityName: activity.name,
        eventType,
        eventDate,
        invoicePercentage
      })

      const transactionsPaths: string[] = []

      for (const transaction of transactions) {
        const path = await createInvoiceDocument({ bill, invoice, transaction })

        transactionsPaths.push(path)
      }

      await InvoicePaymentReportSend({ html, dueAt, activity, email, transactionsPaths, invoiceCode })
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
