import { ok } from '@core/infra/middleware/http_success_response'
import { DisableBillReportUseCase } from '@mail/domain/Contracts/DisableBillReport'
import { disableBillReportSend } from '@mail/domain/send/disable-bill-report'
import { disableBillReportService } from '@mail/services/disable-bill-report'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const disableBillReportUseCase: DisableBillReportUseCase = (data) => {
  const httpResponse = pipe(
    data,
    disableBillReportService(disableBillReportSend),
    TE.map(result => {
      return ok(result)
    })
  )

  return httpResponse
}
