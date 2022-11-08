import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { CreateTestimonialService } from '@design/domain/Contracts/CreateTestimonial'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createTestimonialService: CreateTestimonialService = (createTestimonialDB) => (data) => {
  return pipe(
    TE.tryCatch(
      async () => await createTestimonialDB(data),
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
