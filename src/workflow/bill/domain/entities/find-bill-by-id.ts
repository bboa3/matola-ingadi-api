import { FindBillByIdDB } from '@bill/domain/Contracts/FindBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'billing'
import { ObjectId } from 'mongodb'

export const findBillByIdDB: FindBillByIdDB = async (id) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.findOne({ _id }) as unknown as BillEntity

  if (!found) {
    throw new EntityNotFoundError('Bill')
  }

  const {
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
  } = found

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
