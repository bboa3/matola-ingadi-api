import clientDB from '@core/domain/entities/db'
import { Session, SessionEntity } from 'ingadi'

export const findSessionDB = async (token: string): Promise<Session> => {
  const collection = (await clientDB).db().collection('sessions')

  const foundSession = await collection.findOne({ sessionToken: token }) as unknown as SessionEntity

  if (!foundSession) {
    throw new Error('Not Found')
  }

  const { _id, sessionToken, expires, userId } = foundSession

  return {
    id: _id.toString(),
    sessionToken,
    expires,
    userId: userId.toString()
  }
}
