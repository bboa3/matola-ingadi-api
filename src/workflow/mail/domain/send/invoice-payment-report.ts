import sendMail from '@core/services/mail'
import { InvoicePaymentReportSend } from '@mail/domain/Contracts/InvoicePaymentReport'
import { iconFile } from '@mail/domain/send/icon'
import { logoFile } from '@mail/domain/send/logo'
import fs from 'fs/promises'
import { Attachment, Options } from 'nodemailer/lib/mailer'

export const invoicePaymentReportSend: InvoicePaymentReportSend = async (data) => {
  const { email, html, transactionsPaths, invoiceCode } = data
  const fromEmail = 'team@matolaingadi.co.mz'
  const logo = Buffer.from(logoFile.data)
  const icon = Buffer.from(iconFile.data)

  const transactionAttachments: Attachment[] = []
  let index = 0

  for (const path of transactionsPaths) {
    const invoiceFile = await fs.readFile(path)
    transactionAttachments.push({
      filename: `fatura-${invoiceCode}-${index}-matolaingadi.pdf`,
      content: invoiceFile
    })

    index++
  }

  const msg: Options = {
    to: [email, fromEmail],
    from: `"Matola Ingadi" <${fromEmail}>`,
    subject: `Confirmação do Pagamento da Fatura ${invoiceCode}`,
    html: html,
    attachments: [
      ...transactionAttachments,
      {
        filename: 'matolaingadi-logo.png',
        content: logo,
        cid: 'logo@matolaingadi.co.mz'
      },
      {
        filename: 'matolaingadi-icon.png',
        content: icon,
        cid: 'icon@matolaingadi.co.mz'
      }
    ]
  }

  await sendMail(msg)

  for (const path of transactionsPaths) {
    await fs.unlink(path)
  }
}
