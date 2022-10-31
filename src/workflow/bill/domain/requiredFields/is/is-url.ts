export const isUrl = (value: string) => {
  const regex4 = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

  if (value.match(regex4)) {
    return true
  }

  return false
}
