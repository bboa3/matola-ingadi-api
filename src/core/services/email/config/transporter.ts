import { config } from 'dotenv'
import nodemailer from 'nodemailer'

config()

const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST
const EMAIL_SERVER_PORT = process.env.EMAIL_SERVER_PORT
const EMAIL_SERVER_USER = process.env.AWS_DEFAULT_REGION
const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD

if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_PORT || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD) {
  throw new Error('Email environment Variable are not set')
}

const port = Number(EMAIL_SERVER_PORT)

export const transporter = nodemailer.createTransport({
  host: EMAIL_SERVER_HOST,
  port,
  secure: port === 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_SERVER_USER,
    pass: EMAIL_SERVER_PASSWORD
  }
})
