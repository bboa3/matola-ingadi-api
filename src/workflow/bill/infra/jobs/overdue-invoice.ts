import { overdueInvoiceUseCase } from '@bill/useCases/overdue-invoice'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'overdueInvoiceJob',
  async () => {
    overdueInvoiceUseCase()()
  },
  (err) => console.log(err)
)

export const overdueInvoiceJob = new SimpleIntervalJob(
  { hours: 24 },
  task,
  {
    id: 'overdueInvoiceJob',
    preventOverrun: true
  }
)
