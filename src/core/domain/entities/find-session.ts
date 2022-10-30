import { db } from '@core/domain/entities/db'
import { Session } from 'user'

export const findSessionDB = async (token: string): Promise<Session> => {
  const collection = (await db()).collection('sessions')

  const foundSession = await collection.findOne({ sessionToken: token }) as unknown as Session

  if (!foundSession) {
    throw new Error('Not Found')
  }

  return foundSession
}
