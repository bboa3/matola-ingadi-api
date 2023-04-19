import { UpdateEventDateDB } from '@bill/domain/Contracts/UpdateEventDate'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { EventDateEntity } from 'billing'

export const updateEventDateDB: UpdateEventDateDB = async ({ invoiceCode, status }) => {
  const collection = (await clientDB).db().collection('event_dates')
  const now = createDateUTC().format()

  await collection.updateOne({ invoiceCode }, {
    $set: {
      status,
      updatedAt: now
    }
  })

  const found = await collection.findOne({ invoiceCode }) as unknown as EventDateEntity

  if (!found) {
    throw new EntityNotFoundError('Event Date')
  }

  const { _id, date, updatedAt, createdAt } = found
  const id = _id.toString()

  return {
    id,
    date,
    invoiceCode,
    status,
    updatedAt,
    createdAt
  }
}
