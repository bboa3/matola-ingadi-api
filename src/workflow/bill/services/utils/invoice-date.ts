import { createDateUTC } from '@utils/date'

export const createDueDate = (): string => {
  const now = createDateUTC()
  const dueAt = now.add(5, 'days').format()
  return dueAt
}

export const isOverdueDate = (dueAt: string): boolean => {
  const date = createDateUTC(dueAt)
  const now = createDateUTC()

  return date.isBefore(now)
}
