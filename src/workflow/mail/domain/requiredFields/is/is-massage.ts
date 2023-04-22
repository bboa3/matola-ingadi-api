export const isMessage = (value: any) => {
  if (value.length >= 5 && value.length <= 350) {
    return true
  }

  return false
}
