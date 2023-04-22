import { userSupportController } from '@mail/infra/http/controller/user-support'
import { FastifyPluginCallback } from 'fastify'

export const mailRouter: FastifyPluginCallback = (app, _option, done) => {
  app.post('/support', userSupportController)

  done()
}
