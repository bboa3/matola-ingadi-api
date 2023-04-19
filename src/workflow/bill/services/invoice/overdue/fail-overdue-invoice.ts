import { isOverdueDate } from '@bill/services/utils/invoice-date'
import { Invoice } from 'billing'

interface OverdueInvoice {
  invoiceIndex: number
  invoice: Invoice
}

export const failOverdueInvoice = (invoices: Invoice[]): OverdueInvoice | undefined => {
  let invoiceIndex = 0

  for (const invoice of invoices) {
    const { invoiceStatus, dueAt } = invoice
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
