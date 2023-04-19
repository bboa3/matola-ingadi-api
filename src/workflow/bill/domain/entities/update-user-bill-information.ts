import { UpdateUserBillInformationDB } from '@bill/domain/Contracts/UpdateUserBillInformation'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { createDateUTC } from '@utils/date'
import { BillEntity } from 'billing'
import { ObjectId } from 'mongodb'

export const updateUserBillInformationDB: UpdateUserBillInformationDB = async (data) => {
  const { billId, userId, name, email, phoneNumber, address, guestsNumber } = data
  const updatedAt = createDateUTC().format()

  const _id = new ObjectId(billId)
  const collection = (await clientDB).db().collection('bills')

  if (name) {
    await collection.updateOne({ _id, userId }, {
      $set: { name, updatedAt }
    })
  }

  if (email) {
    await collection.updateOne({ _id, userId }, {
      $set: { email, updatedAt }
    })
  }

  if (phoneNumber) {
    await collection.updateOne({ _id, userId }, {
      $set: { phoneNumber, updatedAt }
    })
  }

  if (address) {
    await collection.updateOne({ _id, userId }, {
      $set: { address, updatedAt }
    })
  }

  if (guestsNumber) {
    await collection.updateOne({ _id, userId }, {
      $set: { guestsNumber, updatedAt }
    })
  }

  const updated = await collection.findOne({ _id }) as unknown as BillEntity

  if (!updated) {
    throw new EntityNotFoundError('Bill')
  }

  return {
    id: updated._id.toString(),
    userId: updated.userId,
    name: updated.name,
    email: updated.email,
    phoneNumber: updated.phoneNumber,
    address: updated.address,
    activity: updated.activity,
    guestsNumber: updated.guestsNumber,
    invoices: updated.invoices,
    status: updated.status,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt
  }
}
