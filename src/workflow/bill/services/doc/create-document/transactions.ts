import { moneyFormatter } from '@bill/services/calculator/money-formatter'
import { Invoice } from 'bill'
import dayjs from 'dayjs'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage,
  width: number
  height: number
  boldFont: PDFFont,
  normalFont: PDFFont
}

const fontSize = 9

export const transactionsInfo = ({ page, width, height, boldFont, normalFont, invoice }: Props) => {
  const { total, transaction, status } = invoice

  const boxWidth = 120
  const boxX = width - 199
  const boxY = height / 2 - 222

  const totalFormatted = moneyFormatter(total)
  const totalWidth = boldFont.widthOfTextAtSize(totalFormatted, fontSize)

  if (!transaction || status !== 'COMPLETED' || !transaction.completedAt) {
    page.drawText('Sem transacções', {
      x: width / 2 - 35,
      y: boxY + 23,
      size: fontSize,
      font: normalFont,
      color: rgb(0, 0, 0)
    })

    return page.drawText(totalFormatted, {
      x: boxX + boxWidth - totalWidth,
      y: boxY + 7,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0)
    })
  }

  const { completedAt, reference, paymentMethod } = transaction

  const paymentMethodName = paymentMethod.name

  const completedDate = completedAt.split('+')[0]

  const completedAtFormatted = dayjs(completedDate).format('DD/MM/YYYY HH:mm')
  page.drawText(completedAtFormatted, {
    x: 97,
    y: 222,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(paymentMethodName, {
    x: 218,
    y: 222,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(reference, {
    x: width / 2 + 53,
    y: 222,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(totalFormatted, {
    x: boxX + boxWidth - totalWidth,
    y: boxY + 22,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const balanceFormatted = moneyFormatter(0)
  const balanceWidth = boldFont.widthOfTextAtSize(balanceFormatted, fontSize)

  page.drawText('0,00TM', {
    x: boxX + boxWidth - balanceWidth,
    y: boxY + 6,
    size: fontSize,
    font: boldFont,
    color: rgb(0, 0, 0)
  })
}
