import { Invoice } from 'billing'

export const findOverdueInvoice = (invoices: Invoice[]): Invoice | undefined => {
  for (const invoice of invoices) {
    const { invoiceStatus } = invoice

    if (invoiceStatus === 'PENDING') {
      return invoice
    }
  }
}
