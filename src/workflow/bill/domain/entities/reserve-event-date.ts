import { ReserveEventDateDB } from '@bill/domain/Contracts/ReserveEventDate'
import clientDB from '@core/domain/entities/db'
import { createDateUTC } from '@utils/date'

export const reserveEventDateDB: ReserveEventDateDB = async ({ date, invoiceCode, status }) => {
  const collection = (await clientDB).db().collection('event_dates')
  const now = createDateUTC().format()

  const { insertedId } = await collection.insertOne({
    date,
    invoiceCode,
    status,
    updatedAt: now,
    createdAt: now
  })

  const id = insertedId.toString()

  return {
    id,
    date,
    invoiceCode,
    status,
    updatedAt: now,
    createdAt: now
  }
}
