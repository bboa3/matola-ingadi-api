import { ValidationError } from '@core/domain/errors/validation_error'
import { UpdateTestimonialPropsValidator } from '@design/domain/Contracts/UpdateTestimonial'
import { UpdateTestimonialPropsCodec } from '@design/domain/requiredFields/update-testimonial'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const updateTestimonialPropsValidator: UpdateTestimonialPropsValidator = (data) => {
  return pipe(
    data,
    UpdateTestimonialPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
