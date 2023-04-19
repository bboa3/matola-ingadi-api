import { PaymentMethod } from '@bill/domain/requiredFields/payment-method'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { Commission } from 'billing'

const paymentMethods = [
  {
    id: 'SIMO/BCI/Mobile24',
    name: 'Conta Móvel',
    commission: {
      model: 'VALUE',
      value: 8
    }
  },
  {
    id: 'MPESA',
    name: 'M-Pesa',
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  },
  {
    id: 'E-MOLA',
    name: 'M-Mola',
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  }
]

export const isPaymentMethod = (value: string) => {
  for (const paymentMethod of paymentMethods) {
    if (paymentMethod.name === value) {
      return true
    }
  }

  return false
}

export const findPaymentMethodCommission = (value: PaymentMethod): Commission => {
  const found = paymentMethods.find(({ name }) => name === value)
  if (!found) {
    throw new EntityNotFoundError('Payment Method Commission')
  }

  return found.commission
}
