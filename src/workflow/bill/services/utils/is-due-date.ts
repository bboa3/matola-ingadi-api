import dayjs from 'dayjs'

interface Props {
  dueAt: string
}

export const isDueDate = ({ dueAt }: Props): boolean => {
  const dueDate = dueAt.split('+')[0]
  const date = dayjs(dueDate)
  const today = new Date()

  return date.isBefore(today)
}
