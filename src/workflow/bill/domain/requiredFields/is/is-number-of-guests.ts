export const isNumberOfGuests = (value: any) => {
  if (value >= 1 && value <= 400) {
    return true
  }

  return false
}
