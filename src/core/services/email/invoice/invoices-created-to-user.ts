import { getEventPricing } from '@bill/domain/requiredFields/is/is-event-pricing'
import { createInvoiceDocument } from '@bill/services/doc/create-document'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import sendMail from '@core/services/email/config/send-mail'
import { dateFormatter } from '@core/services/email/utils/date-formatter'
import { MailDataRequired } from '@sendgrid/mail'
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

interface TempletePros {
  name: string
  eventType: string
  invoice1Code: string
  invoice1Total: number
  invoice1Date: string
  invoice2Code: string
  invoice2Total: number
  invoice2Date: string
  services: string[]
  fromEmail: string
}

const SERVER_URL = process.env.SERVER_URL

if (!SERVER_URL) {
  throw new Error('Ops, SERVER_URL is empty from .env')
}

const userTempletePath = resolve(__dirname, '..', 'templete', 'user', 'created-invoice.hbs')
const userTemplete = fs.readFileSync(userTempletePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(userTemplete)

export const sendInvoicesToUser = async ({ user, invoices }: SendInvoiceProps) => {
  const invoice1 = invoices[0]
  const invoice2 = invoices[1]

  const { service: { eventPricingId } } = invoice1

  const eventPricing = getEventPricing(eventPricingId)

  if (!eventPricing) {
    throw new EntityNotFoundError()
  }

  const services = eventPricing.services.map(({ description }) => description)

  const eventType = invoice1.service.eventType
  const invoice1Code = invoice1.invoiceId.code
  const invoice1Total = invoice1.total
  const invoice1Date = dateFormatter(invoice1.dueAt)

  const invoice2Code = invoice2.invoiceId.code
  const invoice2Total = invoice2.total
  const invoice2Date = dateFormatter(invoice2.dueAt)

  const templetePros: TempletePros = {
    name: user.name!,
    eventType,
    invoice1Code,
    invoice1Total,
    invoice1Date,
    invoice2Code,
    invoice2Total,
    invoice2Date,
    services: services,
    fromEmail: 'matola.ingadi@gmail.com'
  }

  const html = mailTemplateParse(templetePros)

  const invoice1Name = await createInvoiceDocument({ invoice: invoice1, user, eventPricing })
  const invoice2Name = await createInvoiceDocument({ invoice: invoice2, user, eventPricing })

  const invoicePath1 = resolve(__dirname, '..', '..', '..', '..', 'view', 'invoice', invoice1Name)
  const invoicePath2 = resolve(__dirname, '..', '..', '..', '..', 'view', 'invoice', invoice2Name)

  const msg: MailDataRequired = {
    to: 'team@mozeconomia.co.mz',
    from: {
      name: 'Matola Ingadi',
      email: 'team@mozeconomia.co.mz'
    },
    subject: `Fatura do ${eventType}`,
    html: html,
    attachments: [
      {
        content: fs.readFileSync(invoicePath1).toString('base64'),
        filename: invoice1Name,
        type: 'application/pdf',
        disposition: 'attachment'
      },
      {
        content: fs.readFileSync(invoicePath2).toString('base64'),
        filename: invoice2Name,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  }
  await sendMail(msg)
}
