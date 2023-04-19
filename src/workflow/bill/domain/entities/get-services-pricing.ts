import { GetServicesPricingDB } from '@bill/domain/Contracts/GetServicesPricing'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { Locale, PricingEntity } from 'billing'

export const getServicesPricingDB: GetServicesPricingDB = async ({ locale }) => {
  const collection = (await clientDB).db().collection('pricing')

  const found = await collection.find().toArray() as unknown as PricingEntity[]

  if (!found[0]) {
    throw new EntityNotFoundError('Pricing')
  }

  const prices = found.map((pricing) => {
    const { _id, activity, name, price, baseGuestsNumber, discount, services } = pricing

    const id = _id.toString()

    const pricingDiscounts = {
      other: discount.other && {
        id: discount.other.id,
        name: discount.other.name[locale as Locale],
        percentage: discount.other.percentage
      }
    }

    return {
      id,
      discount: pricingDiscounts,
      name: name[locale as Locale],
      price,
      baseGuestsNumber,
      activity: {
        id: activity.id,
        name: activity.name[locale as Locale]
      },
      services: services.map(({ id, description, photos }) => ({
        id,
        description: description[locale as Locale],
        photos
      }))
    }
  })

  return prices
}
