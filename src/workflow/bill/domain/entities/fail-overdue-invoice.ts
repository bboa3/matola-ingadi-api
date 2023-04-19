import { FailOverdueInvoiceDB } from '@bill/domain/Contracts/FailOverdueInvoice'
import clientDB from '@core/domain/entities/db'
import { ObjectId } from 'mongodb'

export const failOverdueInvoiceDB: FailOverdueInvoiceDB = async ({ id, invoices }) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('bills')

  await collection.updateOne({ _id }, {
    $set: {
      invoices
    }
  })
}
