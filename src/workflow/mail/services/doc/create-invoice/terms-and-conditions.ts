import { Transaction } from 'billing'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  transaction: Transaction
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
}

const dateReservationTerm = 'Envie o pagamento no prazo de 2 dias após o recebimento desta fatura.'
const remainedPaymentTerm = 'Envie o pagamento no prazo de 15 dias antes do evento.'

export const termsAndConditionsInfo = ({ page, width, height, normalFont, transaction }: Props) => {
  const { invoicePercentage } = transaction

  const term = invoicePercentage === 25 ? dateReservationTerm : remainedPaymentTerm

  page.drawText(term, {
    x: width / 2 + 68,
    y: 170,
    size: 11,
    lineHeight: 15,
    font: normalFont,
    maxWidth: width / 4 + 10,
    color: rgb(0, 0, 0)
  })
}
