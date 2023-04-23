import sendMail from '@core/services/mail'
import { UserSupportSend } from '@mail/domain/Contracts/UserSupport'
import { iconFile } from '@mail/domain/send/icon'
import { logoFile } from '@mail/domain/send/logo'
import { Options } from 'nodemailer/lib/mailer'

export const userSupportSend: UserSupportSend = async ({ name, email, html }) => {
  const teamEmail = 'team@matolaingadi.co.mz'
  const logo = Buffer.from(logoFile.data)
  const icon = Buffer.from(iconFile.data)

  const msg: Options = {
    to: [teamEmail, 'arlindojosboa@gmail.com'],
    from: `"Matola Ingadi" <${email}>`,
    subject: `${name} Solicitando suporte`,
    html: html,
    attachments: [
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
}
