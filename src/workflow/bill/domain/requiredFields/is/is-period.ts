export const isPeriod = (value: string) => {
  const name = value.toLowerCase()

  if (
    name.match(/month/i) ||
    name.match(/year/i)
  ) {
    return true
  }

  return false
}
