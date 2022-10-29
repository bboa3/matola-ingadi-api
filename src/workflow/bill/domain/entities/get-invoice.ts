import { GetInvoiceDB } from '@bill/domain/Contracts/CreateBillDocument'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'ingadi'
import { ObjectId } from 'mongodb'

export const getInvoiceDB: GetInvoiceDB = async ({ billId, invoiceNumber }) => {
  const id = new ObjectId(billId)
  const collection = (await db()).collection('bills')

  const foundBill = await collection.findOne({ _id: id }) as unknown as BillEntity

  if (!foundBill) {
    throw new EntityNotFoundError()
  }

  const { invoices } = foundBill

  const invoice = invoices.find(({ invoiceNumber: { code } }) => code === invoiceNumber)

  if (!invoice) {
    throw new EntityNotFoundError()
  }

  return invoice
}
