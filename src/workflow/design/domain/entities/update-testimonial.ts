import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { UpdateTestimonialDB } from '@design/domain/Contracts/UpdateTestimonial'
import dayjs from 'dayjs'
import { TestimonialEntity } from 'design'
import { ObjectId } from 'mongodb'

export const updateTestimonialDB: UpdateTestimonialDB = async (data) => {
  const { testimonialId, name, image, description, eventType } = data
  const collection = (await clientDB).db().collection('testimonial')

  const _id = new ObjectId(testimonialId)

  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  await collection.updateOne({ _id }, {
    $set: {
      name,
      image,
      description,
      eventType,
      updatedAt: now
    }
  })

  const updated = await collection.findOne({ _id }) as unknown as TestimonialEntity

  if (!updated) {
    throw new EntityNotFoundError()
  }

  const { createdAt, updatedAt } = updated

  return {
    id: testimonialId,
    name,
    image,
    description,
    eventType,
    createdAt,
    updatedAt
  }
}
