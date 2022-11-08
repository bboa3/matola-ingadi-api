import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { UpdateTestimonialProps } from '@design/domain/requiredFields/update-testimonial'
import { Testimonial } from 'design'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  testimonialId: string
  name: string
  image: string
  description: string
  eventType: string
}

export type UpdateTestimonialPropsValidator = (data: Data) => E.Either<ValidationError, UpdateTestimonialProps>

export type UpdateTestimonialDB = (data: Data) => Promise<Testimonial>

export type UpdateTestimonialService = (db: UpdateTestimonialDB) =>
(data: UpdateTestimonialProps) => TE.TaskEither<HttpErrorResponse, Testimonial>
