import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { UpdateUserProps } from '@user/domain/requiredFields/update-user'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { Address, User } from 'ingadi'

interface Data {
  userId: string
  name?: string
  phoneNumber?: string
  image?: string
  address?: Address
}

export type UpdateUserPropsValidator = (data: Data) => E.Either<ValidationError, UpdateUserProps>

export type UpdateUserDB = (data: UpdateUserProps) => Promise<User>

export type UpdateUserService = (db: UpdateUserDB) =>
(data: UpdateUserProps) => TE.TaskEither<HttpErrorResponse, User>
