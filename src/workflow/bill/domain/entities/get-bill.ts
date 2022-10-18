import { GetBillDB } from '@bill/domain/Contracts/GetBill'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const getBillDB: GetBillDB = async ({ id }) => {
  const pricingId = new ObjectId(id)
  const collection = (await db()).collection('bills')

  const foundBill = await collection.findOne({ _id: pricingId }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { _id, createAt, dueAt, event, initialTotal, discount, total, confirmation } = foundBill

  return {
    id: _id,
    createAt,
    dueAt,
    event,
    initialTotal,
    discount,
    total,
    confirmation
  }
}
