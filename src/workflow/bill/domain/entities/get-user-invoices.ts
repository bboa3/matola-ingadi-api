import { GetUserInvoicesDB } from '@bill/domain/Contracts/GetUserInvoices'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity, Invoice } from 'billing'

export const getUserInvoicesDB: GetUserInvoicesDB = async ({ maxNumber, userId }) => {
  const collection = (await clientDB).db().collection('bills')

  const found = await collection.find({ userId }).toArray() as unknown as BillEntity[]

  if (!found[0]) {
    throw new EntityNotFoundError('Bill')
  }

  let userInvoices: Invoice[] = []

  for (const bill of found) {
    userInvoices = ([...userInvoices, ...bill.invoices])
  }

  if (!userInvoices[0]) {
    throw new EntityNotFoundError('Invoice')
  }

  return userInvoices.slice(-maxNumber)
}
