import { GetEventPricingDB } from '@bill/domain/Contracts/CreateBill'
import { db } from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { PricingEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const getEventPricingDB: GetEventPricingDB = async (id) => {
  const pricingId = new ObjectId(id)
  const collection = (await db()).collection('event_pricing')

  const foundPricing = await collection.findOne({ _id: pricingId }) as unknown as PricingEntity

  if (!foundPricing) {
    throw new EntityNotFoundError()
  }

  const { _id, name, pricing_model: pricingModel, price, services } = foundPricing

  return {
    id: _id,
    name: name,
    pricingModel,
    price: price,
    services: services
  }
}
