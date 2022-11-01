import clientDB from '@core/domain/entities/db'
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

const task = new AsyncTask(
  'simple task',
  async () => {
    const collection = (await clientDB).db().collection('sessions')

    const foundSession = await collection.find().toArray()

    console.log(foundSession)
  },
  (err) => console.log(err)
)
export const job = new SimpleIntervalJob({ minutes: 20 }, task)
