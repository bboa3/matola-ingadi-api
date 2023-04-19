import { SplitInvoiceTransactionProps } from '@bill/services/invoice/split-invoice-transaction'
import { commissionCalculator } from '@bill/services/invoice/split-invoice-transaction/commission-calculator'
import { createDueDate } from '@bill/services/invoice/split-invoice-transaction/date-reservation/overdue-date'
import { createDateUTC } from '@utils/date'
import { percentageCalculator } from '@utils/percentage'
import { Transaction } from 'billing'
import { v4 } from 'uuid'

interface Props extends SplitInvoiceTransactionProps {
  invoicePercentage: number
}

export const createDateReservationTransaction = (data: Props): Transaction => {
  const { total: servicesTotal, invoicePercentage, paymentMethod } = data
  const now = createDateUTC().format()
  const dueAt = createDueDate()

  const amount = percentageCalculator(servicesTotal, invoicePercentage)
  const { paymentGatewayFee, subTotal, total } = commissionCalculator({ amount, paymentMethod })

  return {
    id: v4(),
    transactionType: 'date-reservation',
    status: 'PENDING',
    paymentMethod,
    invoicePercentage,
    subTotal,
    total,
    paymentGatewayFee,
    dueAt,
    updatedAt: now,
    createdAt: now
  }
}
