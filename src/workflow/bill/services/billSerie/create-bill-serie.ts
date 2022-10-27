import { Bill } from 'bill'
import { InvoiceNumber } from 'invoice-number'

interface CreateBillSerieProps {
  lastBill: Bill
}

export const createBillSerie = ({ lastBill }: CreateBillSerieProps) => {
  const { serie } = lastBill

  const newSerie = InvoiceNumber.next(serie)

  return newSerie
}
