import { MongoClient } from 'mongodb'

export const db = async () => {
  const DATABASE_URL = process.env.DATABASE_URL

  if (!DATABASE_URL) {
    throw new Error('Database url is not defined!')
  }

  const client = new MongoClient(DATABASE_URL)

  await client.connect()
  const db = client.db('matola_ingadi')

  return db
}
