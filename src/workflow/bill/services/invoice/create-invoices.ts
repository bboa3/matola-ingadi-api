import { getPaymentMethod } from '@bill/domain/requiredFields/is/is-payment-method'
import { paymentMethodCalculator } from '@bill/services/calculator/payment-method-calculator'
import { EventService, Invoice, InvoiceNumberEntity } from 'ingadi'

interface Props {
  invoiceNumber: InvoiceNumberEntity
  service: EventService
  subTotal: number
  total: number
  paymentMethodId: string
  dueAt: string
  createdAt: string
}

export const createEnvice = ({ invoiceNumber, service, subTotal, total, paymentMethodId, dueAt, createdAt }: Props): Invoice => {
  const paymentMethod = getPaymentMethod(paymentMethodId)

  const invoicePaymentMethod = paymentMethodCalculator({
    totalAmountToPay: total,
    paymentMethod
  })
  return {
    invoiceNumber,
    service,
    subTotal,
    discount: 0,
    total,
    status: 'PENDING',
    paymentMethod: invoicePaymentMethod,
    dueAt,
    createdAt
  }
}
