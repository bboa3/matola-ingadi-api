import { failOverdueInvoiceJob } from '@bill/infra/jobs/fail-overdue-invoice'
import { overdueInvoiceJob } from '@bill/infra/jobs/overdue-invoice'
import app from '@core/infra/http/app'
import { port } from '@utils/env'

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    await app.ready()

    app.scheduler.addSimpleIntervalJob(failOverdueInvoiceJob)
    app.scheduler.addSimpleIntervalJob(overdueInvoiceJob)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
