import { createTestimonialController } from '@design/infra/http/controller/create-testimonial'
import { getGalleryController } from '@design/infra/http/controller/get-gallery'
import { getTestimonialController } from '@design/infra/http/controller/get-testimonial'
import { getTestimonialByIdController } from '@design/infra/http/controller/get-testimonial-by-id'
import { updateTestimonialController } from '@design/infra/http/controller/update-testimonial'
import { uploadGalleryImagesController } from '@design/infra/http/controller/upload-gallery-images'
import { FastifyPluginCallback } from 'fastify'

export const designRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/gallery/images', uploadGalleryImagesController)
  app.get('/gallery', getGalleryController)

  app.get('/testimonial', getTestimonialController)
  app.get('/testimonial/:id', getTestimonialByIdController)
  app.put('/testimonial', updateTestimonialController)
  app.post('/testimonial', createTestimonialController)

  done()
}
