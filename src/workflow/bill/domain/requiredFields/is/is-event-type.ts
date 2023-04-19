export const isEventType = (value: string) => {
  const name = value.toLowerCase()

  if (
    name.match(/Casamento/i) ||
    name.match(/Boda/i) ||
    name.match(/aniversário/i) ||
    name.match(/Graduação/i) ||
    name.match(/Evento Empresarial/i) ||
    name.match(/Evento Corporativo/i) ||
    name.match(/Evento Cultural/i) ||
    name.match(/Festa Religiosa/i) ||
    name.match(/Outros/i)
  ) {
    return true
  }

  return false
}
