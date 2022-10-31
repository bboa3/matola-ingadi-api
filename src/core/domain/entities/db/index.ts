import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

config()

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env')
}

const client = new MongoClient(DATABASE_URL)
const clientDB: Promise<MongoClient> = client.connect()

export default clientDB
