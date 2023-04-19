import sendMail from '@core/services/mail'
import { InvoiceCreationReportSend } from '@mail/domain/Contracts/InvoiceCreationReport'
import fs from 'fs/promises'
import { Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', 'view', 'logo.png')

export const invoiceCreationReportSend: InvoiceCreationReportSend = async (data) => {
  const { email, dueAt, activity, html, invoicePath, invoiceCode } = data
  const fromEmail = 'team@mozeconomia.co.mz'

  const invoiceFile = await fs.readFile(invoicePath)
  const logoFile = await fs.readFile(logoPath)

  const msg: Options = {
    to: [email, fromEmail],
    from: `"MozEconomia" <${fromEmail}>`,
    subject: `Fatura de ${activity.name} vence em ${dueAt}`,
    html: html,
    attachments: [
      {
        filename: `fatura-${invoiceCode}-mozeconomia.pdf`,
        content: invoiceFile
      },
      {
        filename: 'mozeconomia-logo.png',
        content: logoFile,
        cid: 'logo@mozeconomia.co.mz'
      }
    ]
  }

  await sendMail(msg)
  await fs.unlink(invoicePath)
}
