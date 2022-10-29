import { moneyFormatter } from '@bill/services/calculator/money-formatter'
import { Invoice, Pricing } from 'ingadi'
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
  const { service: { eventType, numberOfGuests, total: eventTotal }, paymentMethod, subTotal, total } = invoice
  const { totalCommission, name: paymentMethodName } = paymentMethod
  const { services } = eventPricing

  const boxWidth = 120
  const boxX = width - 199
  const boxY = height / 2 - 233

  const servicesJoined = services.map(({ description }) => description).join(', ').toLocaleLowerCase()

  page.drawText(`${eventType} - ${numberOfGuests} convidados, ${servicesJoined}`, {
    x: width / 2 - 252,
    y: height / 2 - 13,
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

  const totalCommissionFormatted = moneyFormatter(totalCommission)
  const totalCommissionWidth = boldFont.widthOfTextAtSize(totalCommissionFormatted, fontSize)

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
}
