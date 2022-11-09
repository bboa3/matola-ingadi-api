import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { GetTestimonialByIdProps } from '@design/domain/requiredFields/get-testimonial-by-id'
import { Testimonial } from 'design'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  id: string
}

export type GetTestimonialByIdPropsValidator = (data: Data) => E.Either<ValidationError, GetTestimonialByIdProps>

export type GetTestimonialByIdDB = (data: Data) => Promise<Testimonial>

export type GetTestimonialByIdService = (db: GetTestimonialByIdDB) =>
(data: GetTestimonialByIdProps) => TE.TaskEither<HttpErrorResponse, Testimonial>
