import { ConfirmPaymentByAdminService } from '@bill/domain/Contracts/ConfirmPaymentByAdmin'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Id } from '@user/domain/requiredFields/id'
import { Invoice } from 'bill'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const confirmPaymentByAdminService: ConfirmPaymentByAdminService = (updatedBillDB) => (findBillByIdDB) => (findUserById) => (data) => {
  const { adminId, billId, confirmationImage, details, invoiceId: invoiceIdCode } = data
  const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  return pipe(
    TE.tryCatch(
      async () => {
        const bill = await findBillByIdDB(billId)
        const admin = await findUserById({ id: adminId as unknown as Id })

        return { bill, admin }
      },
      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    ),
    TE.chain(({ bill, admin }) => TE.tryCatch(
      async () => {
        const { invoices } = bill

        const newInvoices = invoices.map(invoice => {
          const { invoiceId } = invoice

          if (invoiceId.code === invoiceIdCode) {
            const updatedInvoice: Invoice = {
              ...invoice,
              invoiceId,
              status: 'COMPLETED',
              transaction: {
                confirmationImage,
                confirmedBy: admin.name,
                status: 'COMPLETED',
                reference: 'GAGATYAKFOEJ',
                details,
                startedAt: today,
                completedAt: today
              }
            }

            return updatedInvoice
          }

          return invoice
        })

        const updatedBill = updatedBillDB({ ...bill, invoices: newInvoices })

        return updatedBill
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
