import { deleteInvoiceUseCase } from '@bill/useCases/delete-invoices'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'simple task',
  async () => {
    await deleteInvoiceUseCase()
  },
  (err) => console.log(err)
)

export const deleteInvoiceJob = new SimpleIntervalJob(
  { hours: 12 },
  task,
  {
    id: 'deleteInvoiceJob',
    preventOverrun: true
  }
)
