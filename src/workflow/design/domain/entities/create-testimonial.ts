import clientDB from '@core/domain/entities/db'
import { CreateTestimonialDB } from '@design/domain/Contracts/CreateTestimonial'
import dayjs from 'dayjs'

export const createTestimonialDB: CreateTestimonialDB = async (data) => {
  const { name, image, description, eventType } = data
  const collection = (await clientDB).db().collection('testimonial')

  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    name,
    image,
    description,
    eventType,
    createdAt: now,
    updatedAt: now
  })

  const id = insertedId.toString()

  return {
    id,
    name,
    image,
    description,
    eventType,
    createdAt: now,
    updatedAt: now
  }
}
