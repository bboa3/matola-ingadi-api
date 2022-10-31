export const isName = (value: any) => {
  if (value.length >= 3 && value.length <= 200) {
    return true
  }

  return false
}
