import { GetUserBillDB } from '@bill/domain/Contracts/GetUserBill'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'billing'
import { ObjectId } from 'mongodb'

export const getUserBillDB: GetUserBillDB = async (data) => {
  const id = new ObjectId(data.id)
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.findOne({ _id: id, userId: data.userId }) as unknown as BillEntity

  if (!found) {
    throw new EntityNotFoundError('Bill')
  }

  const { _id, userId, name, email, phoneNumber, address, activity, guestsNumber, invoices, status, createdAt, updatedAt } = found

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
}
