import sendMail from '@core/services/email/config/send-mail'
import { Invoice } from 'bill'
import { config } from 'dotenv'
import fs from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'

config()

// type EmailTemplete = 'INVOICE_CREATED' | 'PAYMENT_CONFIRMED' | 'INVOICE_DUE' | 'INVOICE_FAILED'

interface SendInvoiceProps {
  name: string
  email: string
  invoices: Invoice[]
}

const SERVER_URL = process.env.SERVER_URL

if (!SERVER_URL) {
  throw new Error('Ops, SERVER_URL is empty from .env')
}

const userTempletePath = resolve(__dirname, '..', 'templete', 'user', 'created-invoice.hbs')
const userTemplete = fs.readFileSync(userTempletePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(userTemplete)

const path = resolve(__dirname, '..', '..', '..', '..', 'view', 'img', 'garcon.jpg')

export const sendCreatedInvoice = async ({ name, email, invoices }: SendInvoiceProps) => {
  const fromEmail = process.env.EMAIL_FROM!

  const { dueAt, service } = invoices[0]
  const { eventType } = service

  const html = mailTemplateParse({
    name,
    email,
    fromEmail,
    eventType,
    dueAt,
    services: [eventType]
  })

  await sendMail({
    from: fromEmail,
    to: email,
    subject: 'Hello',
    text: 'Hello world?',
    html: html,
    attachments: [{
      filename: 'garcon.jpg',
      path,
      cid: 'garcon'
    }]
  })
}
