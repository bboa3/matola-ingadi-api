import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import { db } from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const collection = (await db()).collection('bills')

  const { insertedId } = await collection.insertOne(data)
  const id = insertedId.toString()

  return {
    id,
    ...data
  }
}
