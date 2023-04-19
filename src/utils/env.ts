import { config } from 'dotenv'
config()

// Environment
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

// API URLs
export const serverUrl = process.env.SERVER_URL!
export const url = process.env.URL!
export const port = Number(process.env.PORT || 3002)

// Email Config
export const emailServerUser = process.env.EMAIL_SERVER_USER!
export const emailServerPassword = process.env.EMAIL_SERVER_PASSWORD!
export const emailServerHost = process.env.EMAIL_SERVER_HOST!
export const emailServerPort = process.env.EMAIL_SERVER_PORT!

// Data Base
export const databaseUrl = process.env.DATABASE_URL!

if (!serverUrl || !url || !emailServerUser || !emailServerPassword || !emailServerHost || !emailServerPort || !databaseUrl) {
  throw new Error(
    'An environment variable is missing. Rename the \'.env.sample\' file to \'.env.local\' and change the variable values.'
  )
}
