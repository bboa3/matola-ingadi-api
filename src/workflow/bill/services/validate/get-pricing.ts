import { GetPricingPropsValidator } from '@bill/domain/Contracts/GetPricing'
import { GetPricingPropsCodec } from '@bill/domain/requiredFields/get-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getPricingPropsValidator: GetPricingPropsValidator = (data) => {
  return pipe(
    data,
    GetPricingPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
