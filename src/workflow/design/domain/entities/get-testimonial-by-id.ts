import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { GetTestimonialByIdDB } from '@design/domain/Contracts/GetTestimonialById'
import { TestimonialEntity } from 'design'
import { ObjectId } from 'mongodb'

export const getTestimonialByIdDB: GetTestimonialByIdDB = async ({ id }) => {
  const _id = new ObjectId(id)
  const collection = (await clientDB).db().collection('testimonial')

  const found = await collection.findOne({ _id }) as unknown as TestimonialEntity

  if (!found) {
    throw new EntityNotFoundError()
  }

  const { name, image, description, eventType, createdAt, updatedAt } = found

  return {
    id,
    name,
    image,
    description,
    eventType,
    createdAt,
    updatedAt
  }
}
