import { ReserveEventDateDB } from '@bill/domain/Contracts/ReserveEventDate'
import clientDB from '@core/domain/entities/db'
import { EntityAlreadyExistError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { EventDateEntity } from 'billing'

export const reserveEventDateDB: ReserveEventDateDB = async ({ date, invoiceCode, status }) => {
  const collection = (await clientDB).db().collection('event_dates')
  const now = createDateUTC().format()

  const found = await collection.findOne({ date }) as unknown as EventDateEntity

  if (found) {
    throw new EntityAlreadyExistError('Event Date')
  }

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
