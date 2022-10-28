import { moneyFormatter } from '@bill/services/calculator/money-formatter'
import { Bill } from 'bill'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  bill: Bill
  page: PDFPage,
  width: number
  height: number
  boldFont: PDFFont
}

const fontSize = 9

export const transactionsInfo = ({ page, width, height, boldFont, bill }: Props) => {
  const { total } = bill

  const boxWidth = 120
  const boxX = width - 199
  const boxY = height / 2 - 233

  const totalFormatted = moneyFormatter(total)
  const totalWidth = boldFont.widthOfTextAtSize(totalFormatted, fontSize)

  page.drawText(totalFormatted, {
    x: boxX + boxWidth - totalWidth,
    y: boxY + 14,
    size: fontSize,
    font: boldFont,
    color: rgb(0, 0, 0)
  })
}
