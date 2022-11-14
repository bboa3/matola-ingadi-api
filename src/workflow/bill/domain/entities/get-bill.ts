import { GetBillDB } from '@bill/domain/Contracts/GetBill'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const getBillDB: GetBillDB = async (data) => {
  const id = new ObjectId(data.id)
  const collection = (await clientDB).db().collection('bills')

  const foundBill = await collection.findOne({ _id: id, userId: data.userId }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { _id, userId, userName, services, discount, subTotal, total, invoices, status, createdAt } = foundBill

  return {
    id: _id,
    userId,
    userName,
    services,
    discount,
    subTotal,
    total,
    invoices,
    status,
    createdAt
  }
}
