import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { GetTestimonialService } from '@design/domain/Contracts/GetTestimonial'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getTestimonialService: GetTestimonialService = (getTestimonialDB) => {
  return pipe(
    TE.tryCatch(
      async () => await getTestimonialDB(),
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
