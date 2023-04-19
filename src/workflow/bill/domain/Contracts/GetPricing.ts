import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import { GetPricingProps } from '@bill/domain/requiredFields/get-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Pricing } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  id: string
  locale: string
}

export type GetPricingPropsValidator = (data: Data) => E.Either<ValidationError, GetPricingProps>

export type GetPricingService = (db: FindPricingByIdDB) => (data: GetPricingProps)
=> TE.TaskEither<HttpErrorResponse, Pricing>
