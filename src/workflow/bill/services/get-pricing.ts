import { GetPricingService } from '@bill/domain/Contracts/GetPricing'
import { DatabaseFailError } from '@core/domain/errors/domain_error'
import { fail, notFound } from '@core/infra/middleware/http_error_response'
import { Locale } from 'billing'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const getPricingService: GetPricingService = (findPricingByIdDB) => ({ id, locale }) => {
  return pipe(
    TE.tryCatch(
      async () => await findPricingByIdDB({ id, locale: locale as Locale }),
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
