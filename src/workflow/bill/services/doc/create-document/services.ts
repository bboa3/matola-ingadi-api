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
  const { event: { eventType, numberOfGuests } } = bill
  const { services } = eventPricing

  const servicesLine1 = services.map(({ description }) => description).join(', ')

  const line1 = `${eventType} - ${numberOfGuests} convidados, ${servicesLine1}`

  page.drawText(line1, {
    x: width / 2 - 252,
    y: height / 2 + -7,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
