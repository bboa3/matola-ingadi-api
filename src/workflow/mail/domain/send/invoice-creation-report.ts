import sendMail from '@core/services/mail'
import { InvoiceCreationReportSend } from '@mail/domain/Contracts/InvoiceCreationReport'
import { iconFile } from '@mail/domain/send/icon'
import { logoFile } from '@mail/domain/send/logo'
import fs from 'fs/promises'
import { Attachment, Options } from 'nodemailer/lib/mailer'

export const invoiceCreationReportSend: InvoiceCreationReportSend = async (data) => {
  const { email, dueAt, activity, html, transactionsPaths, invoiceCode } = data
  const fromEmail = 'matola.ingadi@gmail.com'
  const icon = Buffer.from(iconFile.data)

  const logo = Buffer.from(logoFile.data)

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
    subject: `Fatura de ${activity.name} vence em ${dueAt}`,
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
