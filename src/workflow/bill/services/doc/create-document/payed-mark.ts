import { degrees, PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  page: PDFPage,
  isPayed: boolean
  width: number
  height: number
  boldFont: PDFFont
}

const svgPath = 'M0 50 H400 V0 H0'

export const payedMark = ({ page, isPayed, width, height, boldFont }: Props) => {
  const text = isPayed ? 'PAGO' : 'POR PAGAR'

  const payedSvgColor = rgb(0.133, 0.645, 0.133)
  const payedSvgBorderColor = rgb(0.133, 0.515, 0.133)

  const notPayedSvgColor = rgb(0.645, 0.133, 0.133)
  const notPayedSvgBorderColor = rgb(0.515, 0.133, 0.133)

  page.drawSvgPath(svgPath, {
    x: width - 178,
    y: height / 2 + 468,
    color: isPayed ? payedSvgColor : notPayedSvgColor,
    borderWidth: 1.5,
    borderColor: isPayed ? payedSvgBorderColor : notPayedSvgBorderColor,
    rotate: degrees(-34.7)
  })

  const payedTextX = width - 108
  const payedTextY = height / 2 + 378

  const notPayedTextX = width - 138
  const notPayedTextY = height / 2 + 398

  return page.drawText(text, {
    x: isPayed ? payedTextX : notPayedTextX,
    y: isPayed ? payedTextY : notPayedTextY,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
    rotate: degrees(-34.3)
  })
}
