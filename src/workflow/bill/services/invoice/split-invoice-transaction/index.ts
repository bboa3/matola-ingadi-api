import { PaymentMethod } from '@bill/domain/requiredFields/payment-method'
import { createDateReservationTransaction } from '@bill/services/invoice/split-invoice-transaction/date-reservation'
import { createRemainingPaymentTransaction } from '@bill/services/invoice/split-invoice-transaction/remaining-payment'
import { Transaction } from 'billing'

export interface SplitInvoiceTransactionProps {
  total: number
  eventDate: string
  paymentMethod: PaymentMethod
}

export const splitInvoiceTransaction = (data: SplitInvoiceTransactionProps): Transaction[] => {
  const reservationTransaction = createDateReservationTransaction({
    ...data,
    invoicePercentage: 25
  })

  const remainingPaymentTransaction = createRemainingPaymentTransaction({
    ...data,
    invoicePercentage: 75
  })

  return [
    reservationTransaction,
    remainingPaymentTransaction
  ]
}
