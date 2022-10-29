import { Invoice, InvoiceStatus } from 'ingadi'
import { degrees, PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  invoice: Invoice
  page: PDFPage
  width: number
  height: number
  boldFont: PDFFont
}

interface CreateXProps {
  width: number
  status: InvoiceStatus
}

interface CreateYProps {
  height: number
  status: InvoiceStatus
}

const createMark = (status: InvoiceStatus) => {
  if (status === 'COMPLETED') return 'PAGO'
  if (status === 'PENDING') return 'POR PAGAR'
  return 'FRACASSADA'
}

const drawTextX = ({ width, status }: CreateXProps) => {
  if (status === 'COMPLETED') return width - 108
  if (status === 'PENDING') return width - 138
  return width - 145
}

const drawTextY = ({ height, status }: CreateYProps) => {
  if (status === 'COMPLETED') return height / 2 + 378
  if (status === 'PENDING') return height / 2 + 398
  return height / 2 + 405
}

const svgPath = 'M0 50 H400 V0 H0'

export const payedMark = ({ invoice, page, width, height, boldFont }: Props) => {
  const { status } = invoice

  const text = createMark(status)

  const payedSvgColor = rgb(0.133, 0.645, 0.133)
  const payedSvgBorderColor = rgb(0.133, 0.515, 0.133)

  const notPayedSvgColor = rgb(0.645, 0.133, 0.133)
  const notPayedSvgBorderColor = rgb(0.515, 0.133, 0.133)

  page.drawSvgPath(svgPath, {
    x: width - 178,
    y: height / 2 + 468,
    color: status === 'COMPLETED' ? payedSvgColor : notPayedSvgColor,
    borderWidth: 1.5,
    borderColor: status === 'COMPLETED' ? payedSvgBorderColor : notPayedSvgBorderColor,
    rotate: degrees(-34.7)
  })

  return page.drawText(text, {
    x: drawTextX({ width, status }),
    y: drawTextY({ height, status }),
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
    rotate: degrees(-34.3)
  })
}
