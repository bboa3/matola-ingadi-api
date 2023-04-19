export const isPhoneNumber = (value: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

  if (
    value.match(regex) ||
    (value.length >= 7 && value.length <= 14)
  ) {
    return true
  }

  return false
}
