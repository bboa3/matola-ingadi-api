import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import { db } from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const { paymentMethod, serie, clientId, createAt, dueAt, event, subTotal, discount, total, confirmation } = data
  const collection = (await db()).collection('bills')

  const { insertedId } = await collection.insertOne({
    serie,
    clientId,
    createAt,
    dueAt,
    event,
    subTotal,
    discount,
    total,
    paymentMethod,
    confirmation
  })
  const id = insertedId.toString()

  return {
    id,
    serie,
    clientId,
    createAt,
    dueAt,
    event,
    subTotal,
    discount,
    total,
    paymentMethod,
    confirmation
  }
}
