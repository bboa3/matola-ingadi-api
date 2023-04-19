import { getMonths } from '@utils/date/months'
import { Invoice } from 'billing'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage,
  width: number
  height: number
  boldFont: PDFFont
}

const { months, dateLocalizer } = getMonths('pt')

export const identifier = ({ page, width, height, boldFont, invoice }: Props) => {
  const { invoiceCode, createdAt } = invoice

  page.drawText(invoiceCode, {
    x: width / 2 - 131,
    y: height / 2 + 133,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0)
  })

  const createAtLocalized = dateLocalizer(createdAt, months)
  const createAtFormatted = `Data ${createAtLocalized}`.toUpperCase()
  return page.drawText(createAtFormatted, {
    x: width / 2 - 238,
    y: height / 2 + 118,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0)
  })
}
