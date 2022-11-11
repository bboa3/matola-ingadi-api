import { moneyFormatter } from '@bill/services/calculator/money-formatter'
import { Invoice, Pricing } from 'bill'
import dayjs from 'dayjs'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
  boldFont: PDFFont
  eventPricing: Pricing
}

const fontSize = 9

export const servicesInfo = ({ page, width, height, normalFont, boldFont, invoice, eventPricing }: Props) => {
  const { service: { eventType, eventDate, guestsNumber, total: eventTotal }, transaction, subTotal, total } = invoice

  const { services } = eventPricing

  const boxWidth = 120
  const boxX = width - 199
  const boxY = height / 2 - 221

  const eventDateFormatted = dayjs(eventDate).format('DD/MM/YYYY')

  const servicesJoined = services.map(({ description }) => description).join(', ').toLocaleLowerCase()

  page.drawText(`${eventType} ${eventDateFormatted} - ${guestsNumber} convidados, ${servicesJoined}`, {
    x: width / 2 - 252,
    y: height / 2 - 2,
    maxWidth: width / 2 + 50,
    size: fontSize,
    lineHeight: 12,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const servicesTotalFormatted = moneyFormatter(eventTotal)
  const servicesTotalWidth = boldFont.widthOfTextAtSize(servicesTotalFormatted, fontSize)

  page.drawText(servicesTotalFormatted, {
    x: boxX + boxWidth - servicesTotalWidth,
    y: boxY + 219,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const subTotalFormatted = moneyFormatter(subTotal)
  const subTotalWidth = boldFont.widthOfTextAtSize(subTotalFormatted, fontSize)

  page.drawText(subTotalFormatted, {
    x: boxX + boxWidth - subTotalWidth,
    y: boxY + 143,
    size: fontSize,
    font: boldFont,
    color: rgb(0, 0, 0)
  })

  const totalFormatted = moneyFormatter(total)
  const totalWidth = boldFont.widthOfTextAtSize(totalFormatted, fontSize)

  page.drawText(totalFormatted, {
    x: boxX + boxWidth - totalWidth,
    y: boxY + 114,
    size: fontSize,
    font: boldFont,
    color: rgb(0, 0, 0)
  })

  if (!transaction) return

  const { totalCommission, name: paymentMethodName } = transaction.paymentMethod

  const totalCommissionFormatted = moneyFormatter(totalCommission)
  const totalCommissionWidth = boldFont.widthOfTextAtSize(totalCommissionFormatted, fontSize)

  page.drawText('Taxa gateway de pagamento', {
    x: width / 2 - 113,
    y: height / 2 - 65,
    maxWidth: width / 2 + 50,
    size: fontSize,
    lineHeight: 12,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(`(${paymentMethodName} ${totalCommissionFormatted})`, {
    x: width / 2 - 133,
    y: height / 2 - 65,
    maxWidth: width / 2 + 50,
    size: fontSize,
    lineHeight: 12,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(totalCommissionFormatted, {
    x: boxX + boxWidth - totalCommissionWidth,
    y: boxY + 168,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
