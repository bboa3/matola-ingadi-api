import sendMail from '@core/services/mail'
import { InvoicePaymentReportSend } from '@mail/domain/Contracts/InvoicePaymentReport'
import fs from 'fs/promises'
import { Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', 'view', 'logo.png')

export const invoicePaymentReportSend: InvoicePaymentReportSend = async (data) => {
  const { email, html, invoicePath, invoiceCode } = data
  const fromEmail = 'team@mozeconomia.co.mz'

  const invoiceFile = await fs.readFile(invoicePath)
  const logoFile = await fs.readFile(logoPath)

  const msg: Options = {
    to: [email, fromEmail],
    from: `"MozEconomia" <${fromEmail}>`,
    subject: `Confirmação do Pagamento da Fatura ${invoiceCode}`,
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
