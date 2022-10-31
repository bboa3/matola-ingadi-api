export const isPhoneNumber = (value: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

  if (value.match(regex)) {
    return true
  }

  return false
}
