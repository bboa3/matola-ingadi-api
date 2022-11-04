import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Id } from '@user/domain/requiredFields/id'
import * as TE from 'fp-ts/lib/TaskEither'
import { User } from 'ingadi'

interface FindUserByIdProps {
  id: Id
}

export type FindUserByIdDB = (data: FindUserByIdProps) => Promise<User>

export type FindUserByIdService = (db: FindUserByIdDB) =>
(data: FindUserByIdProps) => TE.TaskEither<HttpErrorResponse, User>
