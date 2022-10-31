import { CreateInvoiceNumberDB } from '@bill/domain/Contracts/CreateInvoiceNumber'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { InvoiceNumberEntity } from 'bill'
import dayjs from 'dayjs'
import { InvoiceNumber } from 'invoice-number'

export const createInvoiceNumberDB: CreateInvoiceNumberDB = async () => {
  const collection = (await clientDB).db().collection('invoice_numbers')

  const foundNumbers = await collection.find().sort({ _id: -1 }).limit(1).toArray() as unknown as InvoiceNumberEntity[]

  if (!foundNumbers) {
    throw new EntityNotFoundError()
  }

  const lastCode = foundNumbers[0].code

  const newCode = InvoiceNumber.next(lastCode)
  const createdAt = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    code: newCode,
    createdAt
  })

  const _id = insertedId.toString()

  return {
    _id,
    code: newCode,
    createdAt
  }
}
