import { clientError, fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { createUrl } from '@core/infra/upload/create-url'
import { s3Upload } from '@core/infra/upload/s3'
import { updateTestimonialDB } from '@design/domain/entities/update-testimonial'
import { updateTestimonialService } from '@design/services/update-testimonial'
import { updateTestimonialPropsValidator } from '@design/services/validate/update-testimonial'
import dayjs from 'dayjs'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateTestimonialUseCase: Middleware = (httpRequest, httpBody) => {
  const { testimonialId, name, description, eventType } = httpBody

  const bucketName = process.env.AWS_S3_BUCKET_NAME

  const { image } = httpRequest.raw.files
  const blob = image.data
  const contentType = image.mimetype

  const now = dayjs(new Date()).unix()
  const fileName = `${now}-${image.name}`.split(' ').join('').toLowerCase()

  const url = createUrl({ bucketName, fileName })

  const data = { testimonialId, name, image: url, description, eventType }

  const httpResponse = pipe(
    data,
    updateTestimonialPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => TE.tryCatch(
      async () => {
        await s3Upload({ bucketName, name: fileName, blob, contentType })

        return data
      },
      err => {
        console.log(err)
        return fail(new Error(`Cuold not upload the image ${fileName}`))
      }
    )),
    TE.chain(data => pipe(
      data,
      updateTestimonialService(updateTestimonialDB),
      TE.map(testimonial => {
        return ok(testimonial)
      })
    ))
  )

  return httpResponse
}
