import { CreateBillService } from '@bill/domain/Contracts/CreateBill'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { createDateUTC } from '@utils/date'
import { PreBill } from 'billing'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillService: CreateBillService = (createBillDB) => (invoice) => (data) => {
  const { userId, guestsNumber, phoneNumber, name, email, address } = data
  const now = createDateUTC().format()

  return pipe(
    TE.tryCatch(
      async () => {
        const bill: PreBill = {
          userId,
          name,
          email,
          phoneNumber,
          address,
          activity: invoice.activity,
          guestsNumber,
          invoices: [invoice],
          status: 'ACTIVE',
          createdAt: now,
          updatedAt: now
        }

        const newBill = await createBillDB(bill)

        return newBill
      },

      (err: any) => {
        if (err.name === 'EntityNotFound') {
          return notFound(err)
        }

        console.log(err)
        return fail(new DatabaseFailError())
      }
    )
  )
}
