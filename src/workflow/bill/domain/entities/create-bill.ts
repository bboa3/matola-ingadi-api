import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import clientDB from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const { userId, name, email, phoneNumber, address, activity, guestsNumber, invoices, status, createdAt, updatedAt } = data
  const collection = (await clientDB).db().collection('bills')

  const { insertedId } = await collection.insertOne({
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
  })
  const id = insertedId.toString()

  return {
    id,
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
