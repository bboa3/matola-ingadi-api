import { FindBillByIdDB } from '@bill/domain/Contracts/FindBillById'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const findBillByIdDB: FindBillByIdDB = async (id) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('bills')

  const foundBill = await collection.findOne({ _id }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { userId, services, discount, subTotal, total, invoices, status, defaultPaymentMethodId, createdAt } = foundBill

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
