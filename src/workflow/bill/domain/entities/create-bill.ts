import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import { db } from '@core/domain/entities/db'

export const createBillDB: CreateBillDB = async (data) => {
  const { clientId, services, discount, subTotal, total, invoices, status, defaultPaymentMethodId, createdAt } = data
  const collection = (await db()).collection('bills')

  const { insertedId } = await collection.insertOne({
    clientId,
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
    clientId,
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
