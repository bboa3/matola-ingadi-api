import sendMail from '@core/services/mail'
import { OverdueInvoiceReportSend } from '@mail/domain/Contracts/OverdueInvoiceReport'
import fs from 'fs/promises'
import { Attachment, Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', '..', 'view', 'logo.png')

export const overdueInvoiceReportSend: OverdueInvoiceReportSend = async (data) => {
  const { email, html, transactionsPaths, invoiceCode, activity, dueAt } = data
  const fromEmail = 'team@mozeconomia.co.mz'

  const transactionAttachments: Attachment[] = []
  let index = 0

  for (const path of transactionsPaths) {
    const invoiceFile = await fs.readFile(path)
    transactionAttachments.push({
      filename: `fatura-${invoiceCode}-${index}-mozeconomia.pdf`,
      content: invoiceFile
    })

    index++
  }
  const logoFile = await fs.readFile(logoPath)

  const msg: Options = {
    to: [email, fromEmail],
    from: `"MozEconomia" <${fromEmail}>`,
    subject: `Fatura vencida ${invoiceCode} para ${activity.name} vencida ${dueAt}`,
    html: html,
    attachments: [
      ...transactionAttachments,
      {
        filename: 'mozeconomia-logo.png',
        content: logoFile,
        cid: 'logo@mozeconomia.co.mz'
      }
    ]
  }

  await sendMail(msg)

  for (const path of transactionsPaths) {
    await fs.unlink(path)
  }
}
