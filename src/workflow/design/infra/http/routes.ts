import { createTestimonialController } from '@design/infra/http/controller/create-testimonial'
import { getGalleryController } from '@design/infra/http/controller/get-gallery'
import { uploadGalleryImagesController } from '@design/infra/http/controller/upload-gallery-images'
import { FastifyPluginCallback } from 'fastify'

export const designRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/v1/design/gallery/images', uploadGalleryImagesController)

  app.get('/v1/design/gallery', getGalleryController)

  app.post('/v1/design/testimonial', createTestimonialController)

  done()
}
