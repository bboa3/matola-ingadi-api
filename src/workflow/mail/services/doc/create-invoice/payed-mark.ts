import { Invoice, InvoiceStatus } from 'billing'
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
  invoiceStatus: InvoiceStatus
}

interface CreateYProps {
  height: number
  invoiceStatus: InvoiceStatus
}

const createMark = (invoiceStatus: InvoiceStatus) => {
  if (invoiceStatus === 'PAID') return 'PAGO'
  if (invoiceStatus === 'PENDING') return 'POR PAGAR'
  return 'FRACASSADA'
}

const drawTextX = ({ width, invoiceStatus }: CreateXProps) => {
  if (invoiceStatus === 'PAID') return width - 108
  if (invoiceStatus === 'PENDING') return width - 138
  return width - 152
}

const drawTextY = ({ height, invoiceStatus }: CreateYProps) => {
  if (invoiceStatus === 'PAID') return height / 2 + 378
  if (invoiceStatus === 'PENDING') return height / 2 + 398
  return height / 2 + 410
}

const svgPath = 'M0 50 H400 V0 H0'

export const payedMark = ({ invoice, page, width, height, boldFont }: Props) => {
  const { invoiceStatus } = invoice

  const text = createMark(invoiceStatus)

  const payedSvgColor = rgb(0.160, 0.914, 0.625)

  const notPayedSvgColor = rgb(0.645, 0.133, 0.133)

  page.drawSvgPath(svgPath, {
    x: width - 178,
    y: height / 2 + 468,
    color: invoiceStatus === 'PAID' ? payedSvgColor : notPayedSvgColor,
    borderWidth: 1.5,
    borderOpacity: 0,
    rotate: degrees(-34.7)
  })

  return page.drawText(text, {
    x: drawTextX({ width, invoiceStatus }),
    y: drawTextY({ height, invoiceStatus }),
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
    rotate: degrees(-34.3)
  })
}
