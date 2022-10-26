const paymentMethods = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    commission: {
      model: 'percentage',
      value: 2
    }
  },
  {
    id: '24',
    name: 'Conta Móvel',
    commission: {
      model: 'percentage',
      value: 2
    }
  }
]

export const isPaymentMethod = (value: string) => {
  const name = value.toLowerCase()

  for (const method of paymentMethods) {
    if (method.id === name) {
      return true
    }
  }

  return false
}
