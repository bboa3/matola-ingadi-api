import { GetUserBillsDB } from '@bill/domain/Contracts/GetUserBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'billing'

export const getUserBillsDB: GetUserBillsDB = async ({ userId }) => {
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.find({ userId }).sort({ _id: -1 }).limit(10).toArray() as unknown as BillEntity[]

  if (!found[0]) {
    throw new EntityNotFoundError('Bill')
  }

  const bills = found.map((bill) => {
    const { _id, userId, name, email, phoneNumber, address, activity, guestsNumber, invoices, status, createdAt, updatedAt } = bill

    return {
      id: _id.toString(),
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

  return bills
}
