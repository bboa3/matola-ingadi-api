import { GetInvoiceDB } from '@bill/domain/Contracts/GetInvoice'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'billing'
import { ObjectId } from 'mongodb'

export const getInvoiceDB: GetInvoiceDB = async ({ billId, invoiceCode }) => {
  const _id = new ObjectId(billId)
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.findOne({ _id }) as unknown as BillEntity

  if (!found) {
    throw new EntityNotFoundError('Bill')
  }

  const { invoices } = found

  const invoice = invoices.find(invoice => invoice.invoiceCode === invoiceCode)

  if (!invoice) {
    throw new EntityNotFoundError('Invoice')
  }

  return invoice
}
