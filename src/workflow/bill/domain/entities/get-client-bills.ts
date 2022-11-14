import { GetClientBillsDB } from '@bill/domain/Contracts/GetClientBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'

export const getClientBillsDB: GetClientBillsDB = async ({ userId }) => {
  const collection = (await clientDB).db().collection('bills')

  const foundBills = await collection.find({ userId }).sort({ _id: -1 }).toArray() as unknown as BillEntity[]

  if (!foundBills) {
    throw new EntityNotFoundError()
  }

  const bills = foundBills.map((bill) => {
    const { _id, userId, userName, services, discount, subTotal, total, invoices, status, createdAt } = bill
    return { id: _id, userId, userName, services, discount, subTotal, total, invoices, status, createdAt }
  })

  return bills
}
