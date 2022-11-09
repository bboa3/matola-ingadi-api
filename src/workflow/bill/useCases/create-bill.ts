import { createBillDB } from '@bill/domain/entities/create-bill'
import { createInvoiceIdDB } from '@bill/domain/entities/create-invoice-id'
import { reserveEventDateDB } from '@bill/domain/entities/reserve-event-date'
import { createBillService } from '@bill/services/create-bill'
import { createBillPropsValidator } from '@bill/services/validate/create-bill'
import { clientError, fail } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { sendInvoice } from '@core/services/email/sand-invoice'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { paymentMethodId, userId, guestsNumber, discount, eventPricingId, eventType, eventDate } = httpBody

  const data = { paymentMethodId, userId, guestsNumber, discount, eventPricingId, eventType, eventDate }

  const httpResponse = pipe(
    data,
    createBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => pipe(
      data,
      createBillService(createBillDB)(createInvoiceIdDB)(reserveEventDateDB),
      TE.chain(bill => TE.tryCatch(
        async () => {
          await sendInvoice({
            clientEmail: 'arlindojosboa@gmail.com',
            clientName: 'Arlindo Boa',
            templete: 'INVOICE_CREATED'
          })

          return bill
        },
        err => {
          console.log(err)
          return fail(new Error('Could not sand email to the user'))
        })),
      TE.map(bill => {
        return ok(bill)
      })
    ))
  )

  return httpResponse
}
