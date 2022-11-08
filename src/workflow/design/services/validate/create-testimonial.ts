import { ValidationError } from '@core/domain/errors/validation_error'
import { CreateTestimonialPropsValidator } from '@design/domain/Contracts/CreateTestimonial'
import { CreateTestimonialPropsCodec } from '@design/domain/requiredFields/create-testimonial'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const createTestimonialPropsValidator: CreateTestimonialPropsValidator = (data) => {
  return pipe(
    data,
    CreateTestimonialPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
