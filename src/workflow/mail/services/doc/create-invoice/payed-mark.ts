import { Transaction, TransactionStatus } from 'billing'
import { degrees, PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  transaction: Transaction
  page: PDFPage
  width: number
  height: number
  boldFont: PDFFont
}

interface CreateXProps {
  width: number
  transactionStatus: TransactionStatus
}

interface CreateYProps {
  height: number
  transactionStatus: TransactionStatus
}

const createMark = (transactionStatus: TransactionStatus) => {
  if (transactionStatus === 'COMPLETED') return 'PAGO'
  if (transactionStatus === 'PENDING') return 'POR PAGAR'
  return 'FRACASSADA'
}

const drawTextX = ({ width, transactionStatus }: CreateXProps) => {
  if (transactionStatus === 'COMPLETED') return width - 108
  if (transactionStatus === 'PENDING') return width - 138
  return width - 152
}

const drawTextY = ({ height, transactionStatus }: CreateYProps) => {
  if (transactionStatus === 'COMPLETED') return height / 2 + 378
  if (transactionStatus === 'PENDING') return height / 2 + 398
  return height / 2 + 410
}

const svgPath = 'M0 50 H400 V0 H0'

export const payedMark = ({ transaction, page, width, height, boldFont }: Props) => {
  const { status: transactionStatus } = transaction

  const text = createMark(transactionStatus)

  const payedSvgColor = rgb(0.160, 0.914, 0.625)

  const notPayedSvgColor = rgb(0.645, 0.133, 0.133)

  page.drawSvgPath(svgPath, {
    x: width - 178,
    y: height / 2 + 468,
    color: transactionStatus === 'COMPLETED' ? payedSvgColor : notPayedSvgColor,
    borderWidth: 1.5,
    borderOpacity: 0,
    rotate: degrees(-34.7)
  })

  return page.drawText(text, {
    x: drawTextX({ width, transactionStatus }),
    y: drawTextY({ height, transactionStatus }),
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
    rotate: degrees(-34.3)
  })
}
