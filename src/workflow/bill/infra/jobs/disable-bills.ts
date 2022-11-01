import { disableBillsUseCase } from '@bill/useCases/disable-bills'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'simple task',
  async () => {
    disableBillsUseCase()()
  },
  (err) => console.log(err)
)

export const disableBillsJob = new SimpleIntervalJob(
  { minutes: 5 },
  task,
  {
    id: 'disableBillsJob',
    preventOverrun: true
  }
)
