import { CreateBillDocumentDB } from '@bill/domain/Contracts/CreateBillDocument'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const createBillDocumentDB: CreateBillDocumentDB = async (data) => {
  const id = new ObjectId(data.id)
  const collection = (await db()).collection('bills')

  const foundBill = await collection.findOne({ _id: id, clientId: data.clientId }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { _id, paymentMethod, serie, clientId, createAt, dueAt, event, subTotal, discount, total, confirmation } = foundBill

  return {
    id: _id,
    paymentMethod,
    serie,
    clientId,
    createAt,
    dueAt,
    event,
    subTotal,
    discount,
    total,
    confirmation
  }
}
