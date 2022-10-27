import { GetLastCreatedBillDB } from '@bill/domain/Contracts/GetLastCreatedBill'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'

export const getLastCreatedBillDB: GetLastCreatedBillDB = async () => {
  const collection = (await db()).collection('bills')

  const foundBills = await collection.find().sort({ _id: -1 }).limit(1).toArray() as unknown as BillEntity[]

  if (!foundBills) {
    throw new EntityNotFoundError()
  }

  const foundBill = foundBills[0]

  const { _id, paymentMethod, serie, clientId, createAt, dueAt, event, subTotal, discount, total, confirmation } = foundBill

  return {
    id: _id,
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
