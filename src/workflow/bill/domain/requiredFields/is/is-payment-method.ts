import { PaymentMethod } from 'ingadi'

const paymentMethods: PaymentMethod[] = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    commission: {
      model: 'PERCENTAGE',
      value: 2
    }
  },
  {
    id: '24',
    name: 'Conta Móvel',
    commission: {
      model: 'PERCENTAGE',
      value: 2
    }
  }
]

export const isPaymentMethodId = (value: string) => {
  const name = value.toLowerCase()

  for (const method of paymentMethods) {
    if (method.id === name) {
      return true
    }
  }

  return false
}

export const getPaymentMethod = (value: string) => {
  for (const method of paymentMethods) {
    if (method.id === value) {
      return method
    }
  }
}
