import dayjs from 'dayjs'

export const dateFormatter = (unformattedDate: string) => {
  const data = unformattedDate.split('+')[0]

  return dayjs(data).format('DD/MM/YYYY HH:mm')
}
