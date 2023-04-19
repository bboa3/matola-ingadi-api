import { moneyFormatter } from '@mail/services/utils/number-formatter'
import { Invoice } from 'billing'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
  boldFont: PDFFont
}

const fontSize = 13

export const servicesInfo = ({ page, width, height, normalFont, boldFont, invoice }: Props) => {
  const { transaction, total, subTotal, activity } = invoice
  const { paymentMethod, paymentGatewayFee } = transaction

  const boxWidth = 120
  const boxX = width - 210
  const boxY = height / 2 - 221

  page.drawText(activity.name, {
    x: width / 2 - 193,
    y: height / 2 + 22,
    maxWidth: width / 2,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const subTotalFormatted = moneyFormatter(subTotal)
  const subTotalWidth = boldFont.widthOfTextAtSize(subTotalFormatted, fontSize)

  page.drawText(subTotalFormatted, {
    x: boxX + boxWidth - subTotalWidth,
    y: boxY + 242,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(`(${paymentMethod})`, {
    x: width / 2 - 18,
    y: height / 2 - 14,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const paymentGatewayFeeFormatted = moneyFormatter(paymentGatewayFee)
  const paymentGatewayFeeWidth = boldFont.widthOfTextAtSize(paymentGatewayFeeFormatted, fontSize)
  page.drawText(paymentGatewayFeeFormatted, {
    x: boxX + boxWidth - paymentGatewayFeeWidth,
    y: boxY + 206,
    size: fontSize,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const totalFormatted = moneyFormatter(total)
  const totalWidth = boldFont.widthOfTextAtSize(totalFormatted, 11)

  page.drawText(totalFormatted, {
    x: boxX + boxWidth - totalWidth,
    y: boxY + 173,
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const totalAfterTexWidth = boldFont.widthOfTextAtSize(totalFormatted, 15)
  page.drawText(totalFormatted, {
    x: boxX + boxWidth - totalAfterTexWidth,
    y: boxY + 127,
    size: 15,
    font: boldFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(paymentMethod, {
    x: width / 2 + 80,
    y: 80,
    size: 11,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
