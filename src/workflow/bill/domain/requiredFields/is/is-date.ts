export const isDate = (value: string) => {
  const regex4 = /\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*/g

  if (value.match(regex4)) {
    return true
  }

  return false
}
