export const isDescription = (value: any) => {
  if (value.length >= 3 && value.length <= 250) {
    return true
  }

  return false
}
