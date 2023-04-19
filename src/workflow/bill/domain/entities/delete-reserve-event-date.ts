import { DeleteEventDateDB } from '@bill/domain/Contracts/DeleteEventDate'
import clientDB from '@core/domain/entities/db'

export const deleteEventDateDB: DeleteEventDateDB = async ({ invoiceCode }) => {
  const collection = (await clientDB).db().collection('event_dates')

  const { deletedCount } = await collection.deleteOne({ invoiceCode })

  return deletedCount
}
