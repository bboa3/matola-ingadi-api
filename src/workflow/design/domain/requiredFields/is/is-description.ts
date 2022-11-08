export const isDescription = (value: any) => {
  if (value.length >= 5 && value.length <= 300) {
    return true
  }

  return false
}
