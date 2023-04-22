import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { UserSupportProps } from '@mail/domain/requiredFields/user-support'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  name: string
  email: string
  phoneNumber: string
  service: string
  message: string
}

interface SendProps {
  name: string
  email: string
  html: string
}

export type UserSupportPropsValidator = (data: Data) => E.Either<ValidationError, UserSupportProps>

export type UserSupportSend = (data: SendProps) => Promise<void>

export type UserSupportService = (db: UserSupportSend) => (data: UserSupportProps)
=> TE.TaskEither<HttpErrorResponse, void>
