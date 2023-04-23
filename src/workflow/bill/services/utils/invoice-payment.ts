import { InvoicePaymentProps } from '@bill/domain/requiredFields/invoice-payment'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { Invoice, Transaction } from 'billing'
import { findTransaction } from '../invoice/overdue/find-transaction'

interface UpdateInvoicesProps {
  data: InvoicePaymentProps
  invoices: Invoice[]
}

export const updateInvoices = ({ invoices, data }: UpdateInvoicesProps) => {
  const { invoiceCode, paymentMethod, confirmedBy, details, transactionDate, paymentGatewayFee, transactionId } = data
  const now = createDateUTC().format()

  let invoiceIndex = 0

  const invoice = invoices.find((invoice, index) => {
    invoiceIndex = index
    return invoice.invoiceCode === invoiceCode
  })

  if (!invoice) {
    throw new EntityNotFoundError('Invoice')
  }

  const { transactions } = invoice

  const found = findTransaction({ transactions, transactionId })

  const transaction: Transaction = {
    ...found,
    status: 'COMPLETED',
    paymentMethod,
    paymentGatewayFee,
    confirmedBy,
    details,
    transactionDate
  }

  const transactionsUpdated = transactions.map(tr => {
    if (tr.id === transactionId) {
      return transaction
    }
    return tr
  })

  const updatedInvoice: Invoice = {
    ...invoices[invoiceIndex],
    transactions: transactionsUpdated,
    invoiceStatus: 'PAID',
    updatedAt: now
  }

  invoices[invoiceIndex] = updatedInvoice

  return { updatedInvoices: invoices, invoiceIndex, transaction }
}
