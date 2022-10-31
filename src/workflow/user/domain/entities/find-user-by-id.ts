import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { FindUserByIdDB } from '@user/domain/Contracts/FindUserById'
import { UserEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const findUserByIdDB: FindUserByIdDB = async ({ id }) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('users')

  const found = await collection.findOne({ _id }) as unknown as UserEntity

  if (!found) {
    throw new EntityNotFoundError()
  }

  return {
    id: found._id.toString(),
    email: found.email,
    name: found.name,
    phoneNumber: found.phoneNumber,
    image: found.image,
    emailVerified: found.emailVerified,
    admin: found.admin,
    address: found.address,
    updatedAt: found.updatedAt
  }
}
