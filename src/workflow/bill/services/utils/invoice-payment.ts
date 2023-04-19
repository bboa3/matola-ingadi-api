import { InvoicePaymentProps } from '@bill/domain/requiredFields/invoice-payment'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { Invoice, Transaction } from 'billing'

interface UpdateInvoicesProps {
  data: InvoicePaymentProps
  invoices: Invoice[]
}

export const updateInvoices = ({ invoices, data }: UpdateInvoicesProps) => {
  const { invoiceCode, paymentMethod, confirmedBy, details, transactionTime, paymentGatewayFee } = data
  const invoiceIndex = invoices.findIndex(invoice => invoice.invoiceCode === invoiceCode)
  const now = createDateUTC().format()

  if (typeof invoiceIndex === 'undefined') {
    throw new EntityNotFoundError('Invoice')
  }

  const invoice = invoices[invoiceIndex]

  const transaction: Transaction = {
    id: invoice.transaction.id,
    status: 'COMPLETED',
    paymentMethod,
    paymentGatewayFee,
    confirmedBy,
    details,
    transactionTime,
    updatedAt: now,
    createdAt: invoice.transaction.createdAt
  }

  const updatedInvoice: Invoice = {
    ...invoices[invoiceIndex],
    transaction,
    invoiceStatus: 'PAID',
    paidAt: now,
    updatedAt: now
  }

  invoices[invoiceIndex] = updatedInvoice

  return { updatedInvoices: invoices, invoiceIndex }
}
