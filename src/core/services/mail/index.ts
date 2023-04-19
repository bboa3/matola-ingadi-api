import { emailServerHost, emailServerPassword, emailServerPort, emailServerUser } from '@utils/env'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: emailServerHost,
  port: Number(emailServerPort),
  auth: {
    user: emailServerUser,
    pass: emailServerPassword
  }
})

const sendMail = async (msg: any) => {
  await transporter.sendMail(msg)
}
export default sendMail
