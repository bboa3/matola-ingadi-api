import { GetClientBillsDB } from '@bill/domain/Contracts/GetClientBills'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { BillEntity } from 'bill'

export const getClientBillsDB: GetClientBillsDB = async ({ clientId }) => {
  const collection = (await clientDB).db().collection('bills')

  const foundBills = await collection.find({ clientId }).toArray() as unknown as BillEntity[]

  if (!foundBills) {
    throw new EntityNotFoundError()
  }

  const bills = foundBills.map((bill) => {
    const { _id, clientId, services, discount, subTotal, total, invoices, status, defaultPaymentMethodId, createdAt } = bill
    return { id: _id, clientId, services, discount, subTotal, total, invoices, status, defaultPaymentMethodId, createdAt }
  })

  return bills.reverse()
}
