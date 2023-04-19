import { createBillDB } from '@bill/domain/entities/create-bill'
import { createInvoiceIdDB } from '@bill/domain/entities/create-invoice-id'
import { findPricingByIdDB } from '@bill/domain/entities/find-pricing-by-id'
import { reserveEventDateDB } from '@bill/domain/entities/reserve-event-date'
import { createBillService } from '@bill/services/create-bill'
import { createEnvices } from '@bill/services/create-invoices'
import { createBillPropsValidator } from '@bill/services/validate/create-bill'
import { clientError } from '@core/infra/middleware/http_error_response'
import { ok } from '@core/infra/middleware/http_success_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { invoiceCreationReportUseCase } from '@mail/useCases/invoice-creation-report'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const createBillUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, guestsNumber, eventType, eventDate, paymentMethod, paymentGatewayFee, pricingId, name, email, phoneNumber, address } = httpBody

  const data = { userId, guestsNumber, eventType, eventDate, paymentMethod, paymentGatewayFee, pricingId, name, email, phoneNumber, address }

  const httpResponse = pipe(
    data,
    createBillPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(data => {
      const { pricingId, guestsNumber, eventType, eventDate, paymentMethod, paymentGatewayFee } = data

      return pipe(
        { pricingId, guestsNumber, eventType, eventDate, paymentMethod, paymentGatewayFee },
        createEnvices(createInvoiceIdDB)(findPricingByIdDB)(reserveEventDateDB),
        TE.chain(invoice => pipe(
          data,
          createBillService(createBillDB)(invoice),
          TE.map(bill => {
            const invoice = bill.invoices[0]
            invoiceCreationReportUseCase({ invoice, bill })()

            return ok(bill)
          })
        ))
      )
    })
  )

  return httpResponse
}
