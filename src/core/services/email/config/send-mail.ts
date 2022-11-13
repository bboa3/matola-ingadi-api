import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { config } from 'dotenv'

config()

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('Email environment Variable are not set')
}

const sendMail = async (msg: MailDataRequired) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

  await sgMail.send(msg)
}
export default sendMail
