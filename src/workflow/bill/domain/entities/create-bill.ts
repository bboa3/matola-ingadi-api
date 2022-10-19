import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import { db } from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const { createAt, dueAt, event, initialTotal, discount, total, confirmation } = data
  const collection = (await db()).collection('bills')

  const { insertedId } = await collection.insertOne({
    createAt,
    dueAt,
    event,
    initialTotal,
    discount,
    total,
    confirmation
  })
  const id = insertedId.toString()

  return {
    id,
    createAt,
    dueAt,
    event,
    initialTotal,
    discount,
    total,
    confirmation
  }
}
