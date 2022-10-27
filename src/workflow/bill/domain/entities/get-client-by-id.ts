import { GetClientByIdDB } from '@bill/domain/Contracts/CreateBillDocument'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { ClientEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const getClientByIdDB: GetClientByIdDB = async (id) => {
  const clientId = new ObjectId(id)
  const collection = (await db()).collection('clients')

  const foundBill = await collection.findOne({ _id: clientId }) as unknown as ClientEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { _id, name, email, phoneNumber, address, createdAt, updatedAt } = foundBill

  return {
    id: _id,
    name,
    email,
    phoneNumber,
    address,
    createdAt,
    updatedAt
  }
}
