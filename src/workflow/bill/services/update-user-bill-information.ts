import { UpdateUserBillInformationService } from '@bill/domain/Contracts/UpdateUserBillInformation'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateUserBillInformationService: UpdateUserBillInformationService = (updateUserBillInformationDB) => (data) => {
  return TE.tryCatch(
    async () => updateUserBillInformationDB(data),
    (err: any) => {
      if (err.name === 'EntityNotFound') {
        return notFound(err)
      }

      console.log(err)
      return fail(new DatabaseFailError())
    }
  )
}
