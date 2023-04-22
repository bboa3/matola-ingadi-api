import { UserSupportProps } from '@mail/domain/requiredFields/user-support'
import fs from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'

interface TempletePros extends UserSupportProps {
  date: string
}
const userTempletePath = resolve(__dirname, 'html', 'user-support.hbs')
const userTemplete = fs.readFileSync(userTempletePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(userTemplete)

export const createHtml = (data: TempletePros) => {
  const html = mailTemplateParse(data)

  return html
}
