import { createDateUTC } from '@utils/date'

const maxPendingDays = 2

export const createDueDate = (): string => {
  const now = createDateUTC()
  const dueAt = now.add(maxPendingDays, 'days').format()
  return dueAt
}

export const isOverdueDate = (dueAt: string): boolean => {
  const date = createDateUTC(dueAt)
  const now = createDateUTC()

  return date.isBefore(now)
}
