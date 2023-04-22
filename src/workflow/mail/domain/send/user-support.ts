import sendMail from '@core/services/mail'
import { UserSupportSend } from '@mail/domain/Contracts/UserSupport'
import fs from 'fs/promises'
import { Options } from 'nodemailer/lib/mailer'
import { resolve } from 'path'

const logoPath = resolve(__dirname, '..', '..', '..', '..', 'view', 'logo.png')

export const userSupportSend: UserSupportSend = async ({ name, email, html }) => {
  const teamEmail = 'team@mozeconomia.co.mz'
  const logoFile = await fs.readFile(logoPath)

  const msg: Options = {
    to: [teamEmail, 'arlindojosboa@gmail.com'],
    from: `"MozEconomia" <${email}>`,
    subject: `${name} Solicitando suporte`,
    html: html,
    attachments: [
      {
        filename: 'mozeconomia-logo.png',
        content: logoFile,
        cid: 'logo@mozeconomia.co.mz'
      }
    ]
  }

  await sendMail(msg)
}
