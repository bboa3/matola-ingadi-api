import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { FindUserByEmailService } from '@user/domain/Contracts/FindUserByEmail'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const findUserByEmailService: FindUserByEmailService = (findUserByEmailDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => findUserByEmailDB(data),
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
