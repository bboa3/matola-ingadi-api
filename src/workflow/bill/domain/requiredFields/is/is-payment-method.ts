import { PaymentMethod } from 'bill'

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
  },
  {
    id: 'cash',
    name: 'Em dinheiro',
    commission: {
      model: 'VALUE',
      value: 0
    }
  },
  {
    id: 'check',
    name: 'Cheque',
    commission: {
      model: 'VALUE',
      value: 0
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
