import { DeleteReservedEventDateByBillIdDB } from '@bill/domain/Contracts/DeleteReservedEventDateByBillId'
import clientDB from '@core/domain/entities/db'

export const deleteReservedEventDateByBillIdDB: DeleteReservedEventDateByBillIdDB = async ({ billId }) => {
  const collection = (await clientDB).db().collection('event_dates')

  const { deletedCount } = await collection.deleteOne({ billId })

  return deletedCount
}
