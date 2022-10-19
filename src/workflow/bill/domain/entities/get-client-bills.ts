import { GetClientBillsDB } from '@bill/domain/Contracts/GetClientBills'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const getClientBillsDB: GetClientBillsDB = async ({ clientId }) => {
  const id = new ObjectId(clientId)
  const collection = (await db()).collection('bills')

  const foundBills = await collection.find({ clientId: id }).toArray() as unknown as BillEntity[]

  if (!foundBills) {
    throw new EntityNotFoundError()
  }

  const bills = foundBills.map((bill) => {
    const { _id, createAt, dueAt, event, initialTotal, discount, total, confirmation } = bill
    return { id: _id, createAt, dueAt, event, initialTotal, discount, total, confirmation }
  })

  return bills
}
