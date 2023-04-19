import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { FailOverdueInvoiceProducerService } from '@eventStream/domain/Contracts/FailOverdueInvoiceProducer'
import * as TE from 'fp-ts/lib/TaskEither'

export const failOverdueInvoiceProducerService: FailOverdueInvoiceProducerService = (failOverdueInvoiceProducerPublish) => ({ bill, invoice }) => {
  const { id, userId, nextInvoiceDate, status, activity } = bill
  const { invoiceCode, plan, maxTeamMembers, subTotal, total, invoiceStatus } = invoice

  return TE.tryCatch(
    async () => {
      await failOverdueInvoiceProducerPublish({
        billId: id,
        userId,
        invoiceCode,
        invoiceStatus,
        billStatus: status,
        activity,
        plan,
        maxTeamMembers,
        subTotal,
        total,
        nextInvoiceDate
      })
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
