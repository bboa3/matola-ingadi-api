import { GetClientByIdDB } from '@bill/domain/Contracts/CreateBillDocument'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { UserEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const getClientByIdDB: GetClientByIdDB = async (id) => {
  const userId = new ObjectId(id)
  const collection = (await clientDB).db().collection('users')

  const foundClient = await collection.findOne({ _id: userId }) as unknown as UserEntity

  if (!foundClient) {
    throw new EntityNotFoundError()
  }

  const { _id, name, email, phoneNumber, address, emailVerified, image, updatedAt } = foundClient

  return {
    id: _id,
    name,
    email,
    phoneNumber,
    address,
    emailVerified,
    image,
    updatedAt
  }
}
