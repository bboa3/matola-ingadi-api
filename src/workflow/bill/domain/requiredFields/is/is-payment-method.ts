export const isPaymentMethod = (value: string) => {
  if (
    value === 'Conta Móvel' ||
    value === 'M-Pesa' ||
    value === 'M-Mola'
  ) {
    return true
  }

  return false
}
