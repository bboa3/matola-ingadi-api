import { InvoicePaymentDB } from '@bill/domain/Contracts/InvoicePayment'
import clientDB from '@core/domain/entities/db'
import { ObjectId } from 'mongodb'

export const invoicePaymentDB: InvoicePaymentDB = async (data) => {
  const { id, userId, name, email, phoneNumber, address, activity, guestsNumber, invoices, status, createdAt, updatedAt } = data
  const _id = new ObjectId(id)

  const collection = (await clientDB).db().collection('bills')

  await collection.updateOne({ _id }, {
    $set: {
      guestsNumber,
      invoices,
      status,
      updatedAt
    }
  })

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
