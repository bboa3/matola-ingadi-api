export const isInvoiceIdCode = (value: string) => {
  if (value.length === 6) {
    return true
  }

  return false
}
