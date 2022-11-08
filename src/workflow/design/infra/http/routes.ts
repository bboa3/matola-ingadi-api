import { uploadGalleryController } from '@design/infra/http/controller/upload-gallery'
import { FastifyPluginCallback } from 'fastify'

export const designRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/v1/design/gallery', uploadGalleryController)

  done()
}
