import { transporter } from '@core/services/email/config/transporter'
import { config } from 'dotenv'

config()

type EmailTemplete = 'INVOICE_CREATED' | 'PAYMENT_CONFIRMED' | 'INVOICE_DUE' | 'INVOICE_FAILED'

interface SendInvoiceProps {
  clientName: string
  clientEmail: string
  templete: EmailTemplete
}

const EMAIL_FROM = process.env.EMAIL_FROM

if (!EMAIL_FROM) {
  throw new Error('Email environment Variable are not set')
}

export const sendInvoice = async ({ clientEmail, clientName, templete }: SendInvoiceProps) => {
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: clientEmail,
    subject: `Hello ${clientName}`,
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  })

  console.log('Message sent: %s', info.messageId)
}
