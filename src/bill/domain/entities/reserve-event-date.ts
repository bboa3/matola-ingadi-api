import { ReserveEventDateDB } from '@bill/domain/Contracts/ReserveEventDate'
import clientDB from '@core/domain/entities/db'
import dayjs from 'dayjs'

export const reserveEventDateDB: ReserveEventDateDB = async ({ date, billId }) => {
  const collection = (await clientDB).db().collection('event_dates')
  const createdAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    date,
    billId,
    createdAt
  })

  const id = insertedId.toString()

  return {
    id,
    date,
    billId,
    createdAt
  }
}
