import { moneyFormatter } from '@bill/services/calculator/money-formatter'
import { Bill, Pricing } from 'bill'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  bill: Bill
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
  eventPricing: Pricing
}

export const servicesInfo = ({ page, width, height, normalFont, bill, eventPricing }: Props) => {
  const { event: { eventType, numberOfGuests, total: eventTotal }, paymentMethod } = bill
  const { totalCommission } = paymentMethod
  const { services } = eventPricing

  const servicesJoined = services.map(({ description }) => description).join(', ').toLocaleLowerCase()

  page.drawText(`${eventType} - ${numberOfGuests} convidados, ${servicesJoined}`, {
    x: width / 2 - 252,
    y: height / 2 - 7,
    maxWidth: width / 2 + 50,
    size: 9,
    lineHeight: 12,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const servicesTotal = moneyFormatter(eventTotal)

  page.drawText(servicesTotal, {
    x: width - 140,
    y: height / 2 - 8,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const totalCommissionFormatted = moneyFormatter(totalCommission)

  page.drawText(totalCommissionFormatted, {
    x: width - 130,
    y: height / 2 - 59,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
