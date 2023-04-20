import sendMail from '@core/services/mail'
import { DisableBillReportSend } from '@mail/domain/Contracts/DisableBillReport'
import fs from 'fs/promises'
import { Attachment, Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', '..', 'view', 'logo.png')

export const disableBillReportSend: DisableBillReportSend = async (data) => {
  const { email, dueAt, activity, html, transactionsPaths, invoiceCode } = data
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
