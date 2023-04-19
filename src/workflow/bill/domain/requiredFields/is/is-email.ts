
export const isEmail = (value: string) => {
  if (value.trim().toLowerCase() !== value) {
    return false
  }

  if (!value || value.trim().length > 255) {
    return false
  }

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!regex.test(value)) {
    return false
  }

  return true
}
