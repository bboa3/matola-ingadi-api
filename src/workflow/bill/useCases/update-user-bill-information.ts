import { updateUserBillInformationDB } from '@bill/domain/entities/update-user-bill-information'
import { updateUserBillInformationService } from '@bill/services/update-user-bill-information'
import { updateUserBillInformationPropsValidator } from '@bill/services/validate/update-user-bill-information'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { invoiceCreationReportUseCase } from '@mail/useCases/invoice-creation-report'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const updateUserBillInformationUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, billId, maxTeamMembers, name, email, phoneNumber, address } = httpBody

  const data = { userId, billId, maxTeamMembers, name, email, phoneNumber, address }

  const httpResponse = pipe(
    data,
    updateUserBillInformationPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      updateUserBillInformationService(updateUserBillInformationDB),
      TE.map(bill => {
        const invoice = bill.invoices[0]
        invoiceCreationReportUseCase({ invoice, bill })()

        return ok(bill)
      })
    ))
  )
  return httpResponse
}
