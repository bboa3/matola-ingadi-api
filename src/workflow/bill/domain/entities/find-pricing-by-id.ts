import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { PricingEntity } from 'billing'
import { ObjectId } from 'mongodb'

export const findPricingByIdDB: FindPricingByIdDB = async ({ id, locale }) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('pricing')

  const found = await collection.findOne({ _id }) as unknown as PricingEntity

  if (!found) {
    throw new EntityNotFoundError('Pricing')
  }

  const { discount, name, activity, price, baseGuestsNumber, services } = found

  const pricingDiscounts = {
    other: discount.other && {
      id: discount.other.id,
      name: discount.other.name[locale],
      percentage: discount.other.percentage
    }
  }

  return {
    id,
    discount: pricingDiscounts,
    name: name[locale],
    price,
    baseGuestsNumber,
    activity: {
      id: activity.id,
      name: activity.name[locale]
    },
    services: services.map(({ id, description, photos }) => ({
      id,
      description: description[locale],
      photos
    }))
  }
}
