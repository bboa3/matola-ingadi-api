import { FindBillsDB } from '@bill/domain/Contracts/FindBills'
import clientDB from '@core/domain/entities/db'
import { BillEntity } from 'billing'

export const findBillsDB: FindBillsDB = async () => {
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.find().toArray() as unknown as BillEntity[]

  if (!found[0]) {
    return []
  }

  const bills = found.map((bill) => {
    const {
      _id,
      userId,
      name,
      email,
      phoneNumber,
      address,
      activity,
      guestsNumber,
      invoices,
      status,
      createdAt,
      updatedAt
    } = bill

    return {
      id: _id,
      userId,
      name,
      email,
      phoneNumber,
      address,
      activity,
      guestsNumber,
      invoices,
      status,
      createdAt,
      updatedAt
    }
  })

  return bills.reverse()
}
