import { findBillByIdDB } from '@bill/domain/entities/find-bill-by-id'
import { updateBillDB } from '@bill/domain/entities/update-bill'
import { confirmPaymentByAdminService } from '@bill/services/confirm-payment-by-admin'
import { confirmPaymentByAdminPropsValidator } from '@bill/services/validate/confirm-payment-by-admin'
import { clientError, fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { createUrl } from '@core/infra/upload/create-url'
import { s3Upload } from '@core/infra/upload/s3'
import { findUserByIdDB } from '@user/domain/entities/find-user-by-id'
import dayjs from 'dayjs'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const confirmPaymentByAdminUseCase: Middleware = (httpRequest, httpBody) => {
  const { adminId, billId, invoiceId, imageAlt, details, paymentMethodId } = httpBody
  const bucketName = process.env.AWS_S3_BUCKET_NAME

  const { image } = httpRequest.raw.files
  const blob = image.data
  const contentType = image.mimetype

  const now = dayjs(new Date()).unix()
  const fileName = `${now}-${image.name}`.split(' ').join('').toLowerCase()

  const confirmationImage = {
    url: createUrl({ bucketName, fileName }),
    alt: imageAlt
  }

  const data = { adminId, billId, invoiceId, confirmationImage, details, paymentMethodId }

  const httpResponse = pipe(
    data,
    confirmPaymentByAdminPropsValidator,
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
      confirmPaymentByAdminService(updateBillDB)(findBillByIdDB)(findUserByIdDB),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
