import { GetEventDatesDB } from '@bill/domain/Contracts/GetEventDates'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { EventDateEntity } from 'billing'

export const getEventDatesDB: GetEventDatesDB = async ({ maxNumber }) => {
  const collection = (await clientDB).db().collection('event_dates')

  const found = await collection.find().sort({ _id: -1 }).limit(maxNumber).toArray() as unknown as EventDateEntity[]

  if (!found) {
    throw new EntityNotFoundError('Invoice Date')
  }

  const dates = found.map((reserved) => {
    const { _id, date, invoiceCode, createdAt, status, updatedAt } = reserved

    return {
      id: _id.toString(),
      date,
      invoiceCode,
      status,
      updatedAt,
      createdAt
    }
  })

  return dates
}
