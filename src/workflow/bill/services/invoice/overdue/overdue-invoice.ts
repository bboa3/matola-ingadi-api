import { findTransaction } from '@bill/services/invoice/overdue/find-transaction'
import { Invoice } from 'billing'

export const findOverdueInvoice = (invoices: Invoice[]): Invoice | undefined => {
  for (const invoice of invoices) {
    const { transactions } = invoice
    const reservationTransaction = findTransaction({ transactions, transactionType: 'date-reservation' })

    if (reservationTransaction.status === 'PENDING') {
      return invoice
    }
  }
}
