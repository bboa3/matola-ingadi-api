import dayjs from 'dayjs'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
}

const fontSize = 9
const now = dayjs(new Date()).format('DD/MM/YYYY')

export const sign = ({ page, width, normalFont }: Props) => {
  page.drawText(now, {
    x: width / 2 - 22,
    y: 141,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
