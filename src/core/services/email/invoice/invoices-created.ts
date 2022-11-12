import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { createInvoiceDocument } from '@bill/services/doc/create-document'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import sendMail from '@core/services/email/config/send-mail'
import { Invoice } from 'bill'
import { config } from 'dotenv'
import fs from 'fs'
import handlebars from 'handlebars'
import { User } from 'ingadi'
import { resolve } from 'path'

config()

// type EmailTemplete = 'INVOICE_CREATED' | 'PAYMENT_CONFIRMED' | 'INVOICE_DUE' | 'INVOICE_FAILED'

interface SendInvoiceProps {
  user: User
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

export const invoicesCreatedMail = async ({ user, invoices }: SendInvoiceProps) => {
  const fromEmail = process.env.EMAIL_FROM!
  const { name, email } = user
  const { service: { eventType } } = invoices[0]

  const invoicesData = []

  for (const invoice of invoices) {
    const { dueAt, service } = invoice
    const { eventPricingId } = service

    const eventPricing = getEventPricing(eventPricingId)

    if (!eventPricing) {
      throw new EntityNotFoundError()
    }

    const invoice1Name = await createInvoiceDocument({
      invoice,
      user,
      eventPricing
    })

    invoicesData.push({
      dueAt,
      invoice1Name
    })
  }

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
