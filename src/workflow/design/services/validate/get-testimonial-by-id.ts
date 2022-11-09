import { ValidationError } from '@core/domain/errors/validation_error'
import { GetTestimonialByIdPropsValidator } from '@design/domain/Contracts/GetTestimonialById'
import { GetTestimonialByIdPropsCodec } from '@design/domain/requiredFields/get-testimonial-by-id'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getTestimonialByIdPropsValidator: GetTestimonialByIdPropsValidator = (data) => {
  return pipe(
    data,
    GetTestimonialByIdPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
