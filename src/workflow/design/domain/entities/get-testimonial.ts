import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { GetTestimonialDB } from '@design/domain/Contracts/GetTestimonial'
import { TestimonialEntity } from 'design'

export const getTestimonialDB: GetTestimonialDB = async () => {
  const collection = (await clientDB).db().collection('testimonial')

  const found = await collection.find().toArray() as unknown as TestimonialEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const testimonials = found.map((reserved) => {
    const { _id, name, image, description, eventType, createdAt, updatedAt } = reserved

    return {
      id: _id.toString(),
      name,
      image,
      description,
      eventType,
      createdAt,
      updatedAt
    }
  })

  return testimonials
}
