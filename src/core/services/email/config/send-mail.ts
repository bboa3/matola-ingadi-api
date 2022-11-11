import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

config()

const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST
const EMAIL_SERVER_PORT = process.env.EMAIL_SERVER_PORT
const EMAIL_SERVER_USER = process.env.AWS_DEFAULT_REGION
const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD

if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_PORT || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD) {
  throw new Error('Email environment Variable are not set')
}

interface MailProps {
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachments?: Mail.Attachment[]
}

const sendMail = async ({ from, to, subject, text, html, attachments }: MailProps) => {
  const port = Number(process.env.EMAIL_SERVER_PORT)

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: port,
    secure: port === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    },
    attachments
  })
  await transporter.sendMail({ from, to, subject, text, html })
}

export default sendMail
