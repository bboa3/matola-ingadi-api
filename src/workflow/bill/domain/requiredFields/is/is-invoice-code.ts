export const isInvoiceCode = (value: string) => {
  if (value.length === 6) {
    return true
  }

  return false
}
