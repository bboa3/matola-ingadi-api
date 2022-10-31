export const isId = (value: any) => {
  if (value.length >= 10 && value.length <= 200) {
    return true
  }

  return false
}
