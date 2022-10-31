import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { FindUserByEmailProps } from '@user/domain/requiredFields/find-user-by-email'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { User } from 'ingadi'

interface Data {
  email: string
}

export type FindUserByEmailPropsValidator = (data: Data) => E.Either<ValidationError, FindUserByEmailProps>

export type FindUserByEmailDB = (data: FindUserByEmailProps) => Promise<User>

export type FindUserByEmailService = (db: FindUserByEmailDB) =>
(data: FindUserByEmailProps) => TE.TaskEither<HttpErrorResponse, User>
