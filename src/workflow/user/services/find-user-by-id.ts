import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { FindUserByIdService } from '@user/domain/Contracts/FindUserById'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const findUserByIdService: FindUserByIdService = (findUserByIdDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => findUserByIdDB(data),
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
