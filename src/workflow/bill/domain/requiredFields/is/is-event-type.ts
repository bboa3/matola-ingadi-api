export const isEventType = (value: string) => {
  const name = value.toLowerCase()

  if (
    name.match(/casamento/i) ||
    name.match(/boda/i) ||
    name.match(/aniversário/i) ||
    name.match(/graduação/i) ||
    name.match(/evento empresarial/i) ||
    name.match(/evento corporativo/i) ||
    name.match(/evento cultural/i) ||
    name.match(/festa religiosa/i) ||
    name.match(/outros/i)
  ) {
    return true
  }

  return false
}
