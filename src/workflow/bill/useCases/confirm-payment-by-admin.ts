import { findBillByIdDB } from '@bill/domain/entities/find-bill-by-id'
import { updateBillDB } from '@bill/domain/entities/update-bill'
import { confirmPaymentByAdminService } from '@bill/services/confirm-payment-by-admin'
import { confirmPaymentByAdminPropsValidator } from '@bill/services/validate/confirm-payment-by-admin'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { findUserByIdDB } from '@user/domain/entities/find-user-by-id'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const confirmPaymentByAdminUseCase: Middleware = (_httpRequest, httpBody) => {
  const { adminId, billId, invoiceId, confirmationImage, details } = httpBody

  const data = { adminId, billId, invoiceId, confirmationImage, details }

  const httpResponse = pipe(
    data,
    confirmPaymentByAdminPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
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
