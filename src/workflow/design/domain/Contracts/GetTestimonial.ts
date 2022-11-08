import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Testimonial } from 'design'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetTestimonialDB = () => Promise<Testimonial[]>

export type GetTestimonialService = (db: GetTestimonialDB) =>
TE.TaskEither<HttpErrorResponse, Testimonial[]>
