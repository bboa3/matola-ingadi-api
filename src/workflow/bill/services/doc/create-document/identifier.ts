import { Invoice } from 'bill'
import dayjs from 'dayjs'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage,
  width: number
  height: number
  boldFont: PDFFont
  normalFont: PDFFont
}

export const identifier = ({ page, width, height, boldFont, normalFont, invoice }: Props) => {
  const { invoiceId, createdAt, dueAt } = invoice
  const invoiceNumberCode = invoiceId.code

  const createdDate = createdAt.split('+')[0]
  const dueDate = dueAt.split('+')[0]

  const createAtFormatted = dayjs(createdDate).format('DD/MM/YYYY HH:mm')
  const dueAtFormatted = dayjs(dueDate).format('DD/MM/YYYY HH:mm')

  page.drawText(createAtFormatted, {
    x: width / 2 - 162,
    y: height / 2 + 158,
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(dueAtFormatted, {
    x: width / 2 - 186,
    y: height / 2 + 145,
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  return page.drawText(invoiceNumberCode, {
    x: width / 2 - 168,
    y: height / 2 + 173,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0)
  })
}
