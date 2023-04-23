import { findTransaction } from '@bill/services/invoice/overdue/find-transaction'
import { isOverdueDate } from '@bill/services/invoice/split-invoice-transaction/date-reservation/overdue-date'
import { Invoice } from 'billing'

interface OverdueInvoice {
  invoiceIndex: number
  invoice: Invoice

}

export const failOverdueInvoice = (invoices: Invoice[]): OverdueInvoice | undefined => {
  let invoiceIndex = 0

  for (const invoice of invoices) {
    const { transactions } = invoice

    const reservationTransaction = findTransaction({ transactions, transactionType: 'date-reservation' })
    const { dueAt, status } = reservationTransaction
    const isDueInvoice = isOverdueDate(dueAt)

    if (status === 'PENDING' && isDueInvoice) {
      return {
        invoiceIndex,
        invoice: {
          ...invoice,
          invoiceStatus: 'FAILED'
        }
      }
    }

    invoiceIndex++
  }
}
