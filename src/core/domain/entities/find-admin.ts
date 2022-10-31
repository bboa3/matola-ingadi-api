import clientDB from '@core/domain/entities/db'
import { User, UserEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const findAdminDB = async (id: string): Promise<User> => {
  const userId = new ObjectId(id)
  const collection = (await clientDB).db().collection('users')

  const found = await collection.findOne({ _id: userId }) as unknown as UserEntity

  if (!found || !found.admin) {
    throw new Error('Not Found')
  }

  return {
    id,
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
