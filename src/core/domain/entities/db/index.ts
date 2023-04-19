import { databaseUrl } from '@utils/env'
import { MongoClient } from 'mongodb'

const client = new MongoClient(databaseUrl)
const clientDB: Promise<MongoClient> = client.connect()

export default clientDB
