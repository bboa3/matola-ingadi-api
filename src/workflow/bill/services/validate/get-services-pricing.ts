import { GetServicesPricingPropsValidator } from '@bill/domain/Contracts/GetServicesPricing'
import { GetServicesPricingPropsCodec } from '@bill/domain/requiredFields/get-services-pricing'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getServicesPricingPropsValidator: GetServicesPricingPropsValidator = (data) => {
  return pipe(
    data,
    GetServicesPricingPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
