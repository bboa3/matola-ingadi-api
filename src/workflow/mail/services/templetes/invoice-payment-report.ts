import fs from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'

export interface TempletePros {
  name: string
  email: string
  invoiceCode: string
  dueAt: string
  activityName: string
  eventType: string
  eventDate: string
  invoicePercentage: number
}
const templetePath = resolve(__dirname, 'html', 'invoice-payment-report.hbs')
const templete = fs.readFileSync(templetePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(templete)

export const createHtml = (data: TempletePros) => {
  const html = mailTemplateParse(data)

  return html
}
