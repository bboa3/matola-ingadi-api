export const isPostalCode = (value: string) => {
  const regex4 = /^\d{4}(?:[- ]?\d{4})?$/
  const regex5 = /^\d{5}(?:[- ]?\d{4})?$/

  if (value.match(regex4) || value.match(regex5)) {
    return true
  }

  return false
}
