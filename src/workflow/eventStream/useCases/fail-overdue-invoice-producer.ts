import { ok } from '@core/infra/middleware/http_success_response'
import { FailOverdueInvoiceProducerUseCase } from '@eventStream/domain/Contracts/FailOverdueInvoiceProducer'
import { failOverdueInvoiceProducerPublish } from '@eventStream/domain/publish/fail-overdue-invoice-producer'
import { failOverdueInvoiceProducerService } from '@eventStream/services/fail-overdue-invoice-producer'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const failOverdueInvoiceProducerUseCase: FailOverdueInvoiceProducerUseCase = (data) => {
  const httpResponse = pipe(
    data,
    failOverdueInvoiceProducerService(failOverdueInvoiceProducerPublish),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
