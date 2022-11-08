import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { GetGalleryDB } from '@design/domain/Contracts/GetGallery'
import { GalleryEntity } from 'design'

export const getGalleryDB: GetGalleryDB = async () => {
  const collection = (await clientDB).db().collection('gallery')

  const found = await collection.find().toArray() as unknown as GalleryEntity[]

  if (!found) {
    throw new EntityNotFoundError()
  }

  const gallery = found.map((reserved) => {
    const { _id, name, images, description, highlights, details } = reserved

    return {
      id: _id.toString(),
      name,
      images,
      description,
      highlights,
      details
    }
  })

  return gallery
}
