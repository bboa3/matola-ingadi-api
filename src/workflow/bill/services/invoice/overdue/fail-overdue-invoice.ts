import { isOverdueDate } from '@bill/services/invoice/split-invoice-transaction/date-reservation/overdue-date'
import { Invoice, Transaction, TransactionType } from 'billing'

interface OverdueInvoice {
  invoiceIndex: number
  invoice: Invoice

}

export const failOverdueInvoice = (invoices: Invoice[]): OverdueInvoice | undefined => {
  let invoiceIndex = 0

  for (const invoice of invoices) {
    const { invoiceStatus, transactions } = invoice

    const reservationTransaction = findTransaction(transactions, 'date-reservation')
    const { dueAt } = reservationTransaction
    const isDueInvoice = isOverdueDate(dueAt)

    if (invoiceStatus === 'PENDING' && isDueInvoice) {
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

function findTransaction (transactions: Transaction[], transactionType: TransactionType) {
  return transactions.find(t => t.transactionType === transactionType)!
}
