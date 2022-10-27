import { Bill } from 'bill'
import dayjs from 'dayjs'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  bill: Bill
  page: PDFPage,
  width: number
  height: number
  boldFont: PDFFont
  normalFont: PDFFont
}

export const identifier = ({ page, width, height, boldFont, normalFont, bill }: Props) => {
  const { serie, createAt, dueAt } = bill

  const createdDate = createAt.split('+')[0]
  const dueDate = dueAt.split('+')[0]

  const createAtFormatted = dayjs(createdDate).format('DD/MM/YYYY HH:mm')
  const dueAtFormatted = dayjs(dueDate).format('DD/MM/YYYY HH:mm')

  page.drawText(createAtFormatted, {
    x: width / 2 - 162,
    y: height / 2 + 160, // 118
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(dueAtFormatted, {
    x: width / 2 - 186,
    y: height / 2 + 146,
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  return page.drawText(serie, {
    x: width / 2 - 168,
    y: height / 2 + 174,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0)
  })
}
