import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const createDateUTC = (date?: string | number | dayjs.Dayjs | Date) => dayjs(date).utc()
export const createDate = (date?: string | number | dayjs.Dayjs | Date) => dayjs(date)
