import sendMail from '@core/services/mail'
import { OverdueInvoiceReportSend } from '@mail/domain/Contracts/OverdueInvoiceReport'
import { iconFile } from '@mail/domain/send/icon'
import { logoFile } from '@mail/domain/send/logo'
import fs from 'fs/promises'
import { Attachment, Options } from 'nodemailer/lib/mailer'

export const overdueInvoiceReportSend: OverdueInvoiceReportSend = async (data) => {
  const { email, html, transactionsPaths, invoiceCode, activity, dueAt } = data
  const fromEmail = 'team@matolaingadi.co.mz'
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
    subject: `Fatura vencida ${invoiceCode} para ${activity.name} vencida ${dueAt}`,
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
