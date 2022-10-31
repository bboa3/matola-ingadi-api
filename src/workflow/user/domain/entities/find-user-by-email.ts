import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { FindUserByEmailDB } from '@user/domain/Contracts/FindUserByEmail'
import { UserEntity } from 'ingadi'

export const findUserByEmailDB: FindUserByEmailDB = async ({ email }) => {
  const collection = (await clientDB).db().collection('users')

  const found = await collection.findOne({ email }) as unknown as UserEntity

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
