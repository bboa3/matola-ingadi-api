import { CreateBillDB } from '@bill/domain/Contracts/CreateBill'
import { getReservedDatesDB } from '@bill/domain/entities/get-reserved-dates'
import clientDB from '@core/domain/entities/db'
import { EntityAlreadyExistError } from '@core/domain/errors/domain_error'
import dayjs from 'dayjs'

export const createBillDB: CreateBillDB = async (data) => {
  const { userId, services, discount, subTotal, total, invoices, status } = data
  const collection = (await clientDB).db().collection('bills')

  const { eventDate } = services
  const reservedDates = await getReservedDatesDB()

  for (const reserved of reservedDates) {
    const reservedDate = reserved.date

    if (eventDate === reservedDate) {
      throw new EntityAlreadyExistError('Please, Select a different date. The selected date is already reserved')
    }
  }

  const today = dayjs(new Date())
  const createdAt = today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    userId,
    services,
    discount,
    subTotal,
    total,
    invoices,
    status,
    createdAt
  })
  const id = insertedId.toString()

  return {
    id,
    userId,
    services,
    discount,
    subTotal,
    total,
    invoices,
    status,
    createdAt
  }
}
