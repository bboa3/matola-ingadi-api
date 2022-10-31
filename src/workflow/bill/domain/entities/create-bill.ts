import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import clientDB from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const { userId, services, discount, subTotal, total, invoices, status, defaultPaymentMethodId, createdAt } = data
  const collection = (await clientDB).db().collection('bills')

  const { insertedId } = await collection.insertOne({
    userId,
    services,
    discount,
    subTotal,
    total,
    invoices,
    status,
    defaultPaymentMethodId,
    createdAt
  })
  const id = insertedId.toString()

  return {
    id,
    userId,
    services,
    discount,
    subTotal,
    total,
    invoices,
    status,
    defaultPaymentMethodId,
    createdAt
  }
}
