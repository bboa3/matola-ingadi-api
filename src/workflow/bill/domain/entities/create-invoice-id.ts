import { CreateInvoiceNumberDB } from '@bill/domain/Contracts/CreateInvoiceNumber'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { InvoiceIdEntity } from 'bill'
import dayjs from 'dayjs'
import { InvoiceNumber } from 'invoice-number'

export const createInvoiceIdDB: CreateInvoiceNumberDB = async () => {
  const collection = (await clientDB).db().collection('invoice_ids')

  const found = await collection.find().sort({ _id: -1 }).limit(1).toArray() as unknown as InvoiceIdEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const lastCode = found[0].code

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
