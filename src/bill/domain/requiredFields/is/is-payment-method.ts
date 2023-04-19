import { PaymentMethod } from 'bill'

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'SIMO/BCI/Mobile24',
    name: 'Conta Móvel',
    commission: {
      model: 'VALUE',
      value: 8
    },
    onlyAdmin: false
  },
  {
    id: 'MBIM/IZI',
    name: 'IZI',
    onlyAdmin: false,
    commission: {
      model: 'VALUE',
      value: 10
    }
  },
  {
    id: 'MPESA',
    name: 'M-Pesa',
    onlyAdmin: false,
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  },
  {
    id: 'TOPUP',
    name: 'TOPUP',
    onlyAdmin: false,
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  },
  {
    id: 'E-MOLA',
    name: 'M-Mola',
    onlyAdmin: false,
    commission: {
      model: 'PERCENTAGE',
      value: 3
    }
  },
  {
    id: 'VISA:',
    name: 'M-Mola',
    onlyAdmin: false,
    commission: {
      model: 'PERCENTAGE',
      value: 4
    }
  },
  {
    id: 'cash',
    name: 'Em dinheiro',
    onlyAdmin: true,
    commission: {
      model: 'VALUE',
      value: 0
    }
  },
  {
    id: 'check',
    name: 'Cheque',
    onlyAdmin: false,
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
