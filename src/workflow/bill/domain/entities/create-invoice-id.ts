import { CreateInvoiceNumberDB } from '@bill/domain/Contracts/CreateInvoice'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { InvoiceIdEntity } from 'billing'
import { InvoiceNumber } from 'invoice-number'

export const createInvoiceIdDB: CreateInvoiceNumberDB = async () => {
  const collection = (await clientDB).db().collection('invoice_ids')

  const found = await collection.find().sort({ _id: -1 }).limit(1).toArray() as unknown as InvoiceIdEntity[]

  if (!found[0]) {
    throw new EntityNotFoundError('Invoice Id')
  }

  const { code, _id } = found[0]

  const newCode = InvoiceNumber.next(code)
  const updatedAt = createDateUTC().format()

  await collection.updateOne({ _id }, {
    $set: {
      code: newCode,
      updatedAt
    }
  })

  return newCode
}
