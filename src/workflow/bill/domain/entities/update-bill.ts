import { UpdateBillDB } from '@bill/domain/Contracts/UpdateBill'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const updateBillDB: UpdateBillDB = async (data) => {
  const { id, services, discount, subTotal, total, invoices, status } = data
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('bills')

  await collection.updateOne({ _id }, {
    $set: {
      services,
      discount,
      subTotal,
      total,
      invoices,
      status
    }
  })

  const updatedBill = await collection.findOne({ _id }) as unknown as BillEntity

  if (!updatedBill) {
    throw new EntityNotFoundError()
  }

  return {
    id,
    userId: updatedBill.userId,
    services: updatedBill.services,
    discount: updatedBill.discount,
    subTotal: updatedBill.subTotal,
    total: updatedBill.total,
    invoices: updatedBill.invoices,
    status: updatedBill.status,
    createdAt: updatedBill.createdAt
  }
}
