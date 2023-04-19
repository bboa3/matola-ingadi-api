import { isOverdueDate } from '@bill/services/utils/invoice-date'
import { Invoice } from 'billing'

export const failOverdueInvoice = (invoices: Invoice[]) => {
  const updatedInvoices: Invoice[] = []
  let isOverdueInvoice = false

  for (const invoice of invoices) {
    const { invoiceStatus, dueAt } = invoice
    const isDueInvoice = isOverdueDate(dueAt)

    if (invoiceStatus === 'PENDING' && isDueInvoice) {
      updatedInvoices.push({
        ...invoice,
        invoiceStatus: 'FAILED'
      })

      isOverdueInvoice = true
    }

    updatedInvoices.push({
      ...invoice
    })
  }

  return { updatedInvoices, isOverdueInvoice }
}
