import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { CreateTestimonialProps } from '@design/domain/requiredFields/create-testimonial'
import { Testimonial } from 'design'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  name: string
  image: string
  description: string
  eventType: string
}

export type CreateTestimonialPropsValidator = (data: Data) => E.Either<ValidationError, CreateTestimonialProps>

export type CreateTestimonialDB = (data: Data) => Promise<Testimonial>

export type CreateTestimonialService = (db: CreateTestimonialDB) =>
(data: CreateTestimonialProps) => TE.TaskEither<HttpErrorResponse, Testimonial>
