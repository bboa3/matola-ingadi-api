import { failOverdueInvoiceUseCase } from '@bill/useCases/fail-overdue-invoice'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'failOverdueInvoiceJob',
  async () => {
    failOverdueInvoiceUseCase()()
  },
  (err) => console.log(err)
)

export const failOverdueInvoiceJob = new SimpleIntervalJob(
  { hours: 12 },
  task,
  {
    id: 'failOverdueInvoiceJob',
    preventOverrun: true
  }
)
