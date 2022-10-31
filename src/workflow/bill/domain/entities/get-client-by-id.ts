import { GetClientByIdDB } from '@bill/domain/Contracts/CreateBillDocument'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { UserEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const getClientByIdDB: GetClientByIdDB = async (id) => {
  const clientId = new ObjectId(id)
  const collection = (await clientDB).db().collection('clients')

  const foundClient = await collection.findOne({ _id: clientId }) as unknown as UserEntity

  if (!foundClient) {
    throw new EntityNotFoundError()
  }

  const { _id, name, email, phoneNumber, address, createdAt, updatedAt } = foundClient

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
