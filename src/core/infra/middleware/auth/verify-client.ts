import { findSessionDB } from '@core/domain/entities/find-session'
import { unauthorized } from '@core/infra/middleware/http_error_response'
import { Middleware } from '@core/infra/middleware/middleware'
import { FastifyRequest } from 'fastify'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const verifyClient: Middleware = (request: FastifyRequest, _httpBody) => {
  const httpResponse = pipe(
    TE.tryCatch(
      async () => {
        const bearerHeader = request.headers.authorization

        if (!bearerHeader) throw new Error('Not authorized')

        const bearerToken = bearerHeader.split(' ')[1]

        const { userId } = await findSessionDB(bearerToken)
        const body = request.body as any

        return { ...body, userId }
      },
      (_err) => {
        return unauthorized(new Error('Not authorized'))
      })
  )

  return httpResponse
}
