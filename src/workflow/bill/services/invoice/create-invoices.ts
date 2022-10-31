import { getPaymentMethod } from '@bill/domain/requiredFields/is/is-payment-method'
import { paymentMethodCalculator } from '@bill/services/calculator/payment-method-calculator'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { EventService, Invoice, InvoiceIdEntity } from 'bill'

interface Props {
  invoiceId: InvoiceIdEntity
  service: EventService
  subTotal: number
  total: number
  paymentMethodId: string
  dueAt: string
  createdAt: string
}

export const createEnvice = ({ invoiceId, service, subTotal, total, paymentMethodId, dueAt, createdAt }: Props): Invoice => {
  const paymentMethod = getPaymentMethod(paymentMethodId)

  if (!paymentMethod) {
    throw new EntityNotFoundError()
  }

  const invoicePaymentMethod = paymentMethodCalculator({
    totalAmountToPay: total,
    paymentMethod
  })

  return {
    invoiceId,
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
