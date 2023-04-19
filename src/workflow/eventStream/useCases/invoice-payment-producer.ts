import { ok } from '@core/infra/middleware/http_success_response'
import { InvoicePaymentProducerUseCase } from '@eventStream/domain/Contracts/InvoicePaymentProducer'
import { invoicePaymentProducerPublish } from '@eventStream/domain/publish/invoice-payment-producer'
import { invoicePaymentProducerService } from '@eventStream/services/invoice-payment-producer'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const invoicePaymentProducerUseCase: InvoicePaymentProducerUseCase = (data) => {
  const httpResponse = pipe(
    data,
    invoicePaymentProducerService(invoicePaymentProducerPublish),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
