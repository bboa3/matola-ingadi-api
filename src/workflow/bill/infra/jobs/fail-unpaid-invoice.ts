import { failUnpaidInvoiceUseCase } from '@bill/useCases/fail-unpaid-invoice'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'simple task',
  async () => {
    failUnpaidInvoiceUseCase()()
  },
  (err) => console.log(err)
)
export const failUnpaidInvoiceJob = new SimpleIntervalJob(
  { minutes: 8 },
  task,
  {
    id: 'failUnpaidInvoiceJob',
    preventOverrun: true
  }
)
