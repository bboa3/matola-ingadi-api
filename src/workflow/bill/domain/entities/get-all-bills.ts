import { GetAllBillsDB } from '@bill/domain/Contracts/GetAllBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'

export const getAllBillsDB: GetAllBillsDB = async () => {
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.find().sort({ _id: -1 }).limit(30).toArray() as unknown as BillEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const bills = found.map((bill) => {
    const { _id, userId, services, discount, subTotal, total, invoices, status, createdAt } = bill
    return { id: _id, userId, services, discount, subTotal, total, invoices, status, createdAt }
  })

  return bills
}
