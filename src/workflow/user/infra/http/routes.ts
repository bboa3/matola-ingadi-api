import { findUserByEmailController } from '@user/infra/http/controller/find-user-by-email'
import { findUserByIdController } from '@user/infra/http/controller/find-user-by-id'
import { updateUserController } from '@user/infra/http/controller/update-user'
import { FastifyPluginCallback } from 'fastify'

export const userRouter: FastifyPluginCallback = (app, _option, done) => {
  app.put('/v1/user', updateUserController)
  app.get('/v1/user', findUserByIdController)
  app.post('/v1/user/email', findUserByEmailController)

  done()
}
