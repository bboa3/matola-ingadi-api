import { GetServicesPricingProps } from '@bill/domain/requiredFields/get-services-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Pricing } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  locale: string
}

export type GetServicesPricingPropsValidator = (data: Data) => E.Either<ValidationError, GetServicesPricingProps>

export type GetServicesPricingDB = (data: GetServicesPricingProps) => Promise<Pricing[]>

export type GetServicesPricingService = (db: GetServicesPricingDB) => (data: GetServicesPricingProps)
=> TE.TaskEither<HttpErrorResponse, Pricing[]>
