import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { UploadGalleryImagesDB } from '@design/domain/Contracts/UploadGalleryImages'
import { GalleryEntity } from 'design'
import { ObjectId } from 'mongodb'

export const uploadGalleryImagesDB: UploadGalleryImagesDB = async ({ galleryId, images: newImages }) => {
  const collection = (await clientDB).db().collection('gallery')
  const _id = new ObjectId(galleryId)

  const found = await collection.findOne({ _id }) as unknown as GalleryEntity

  if (!found) {
    throw new EntityNotFoundError()
  }

  const { images } = found

  for (const newImage of newImages) {
    const { url, imageIndex } = newImage

    const alt = images[imageIndex].alt

    images[imageIndex] = {
      url,
      alt
    }
  }

  await collection.updateOne({ _id }, {
    $set: {
      images
    }
  })

  return 'Done'
}
