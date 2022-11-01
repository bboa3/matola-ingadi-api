import { GetReservedDatesDB } from '@bill/domain/Contracts/GetReservedDates'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { ReservedEventDateEntity } from 'bill'

export const getReservedDatesDB: GetReservedDatesDB = async () => {
  const collection = (await clientDB).db().collection('event_dates')

  const found = await collection.find().sort({ _id: -1 }).limit(50).toArray() as unknown as ReservedEventDateEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const bills = found.map((reserved) => {
    const { _id, date, billId, createdAt } = reserved

    return {
      id: _id.toString(),
      date,
      billId,
      createdAt
    }
  })

  return bills
}
