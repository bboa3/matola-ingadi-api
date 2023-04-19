import { createDateUTC } from '@utils/date'

export const createDueDate = (eventDate: string): string => {
  const dueAt = createDateUTC(eventDate).format()
  return dueAt
}

export const isOverdueDate = (dueAt: string): boolean => {
  const date = createDateUTC(dueAt)
  const now = createDateUTC()

  return date.isBefore(now)
}
