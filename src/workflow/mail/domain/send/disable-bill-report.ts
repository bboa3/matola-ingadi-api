import sendMail from '@core/services/mail'
import { DisableBillReportSend } from '@mail/domain/Contracts/DisableBillReport'
import fs from 'fs/promises'
import { Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', 'view', 'logo.png')

export const disableBillReportSend: DisableBillReportSend = async (data) => {
  const { email, dueAt, activity, html, invoicePath, invoiceCode } = data
  const fromEmail = 'team@mozeconomia.co.mz'

  const invoiceFile = await fs.readFile(invoicePath)
  const logoFile = await fs.readFile(logoPath)

  const msg: Options = {
    to: [email, fromEmail],
    from: `"MozEconomia" <${fromEmail}>`,
    subject: `Fatura vencida ${invoiceCode} para ${activity.name} vencida ${dueAt}`,
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
