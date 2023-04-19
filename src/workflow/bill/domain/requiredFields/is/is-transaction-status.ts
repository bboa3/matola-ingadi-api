export const isTransactionStatus = (value: string) => {
  if (
    value === 'PENDING' ||
    value === 'COMPLETED' ||
    value === 'FAILED'
  ) {
    return true
  }

  return false
}
