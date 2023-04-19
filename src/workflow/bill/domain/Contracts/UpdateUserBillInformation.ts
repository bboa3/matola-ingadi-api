import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Address, Bill } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { UpdateUserBillInformationProps } from '../requiredFields/update-user-bill-information'

interface Data {
  userId: string
  billId: string
  name?: string
  email?: string
  phoneNumber?: string
  address?: Address
  guestsNumber?: number
}

export type UpdateUserBillInformationPropsValidator = (data: Data) => E.Either<ValidationError, UpdateUserBillInformationProps>

export type UpdateUserBillInformationDB = (data: UpdateUserBillInformationProps) => Promise<Bill>

export type UpdateUserBillInformationService = (db: UpdateUserBillInformationDB)
=> (data: UpdateUserBillInformationProps) => TE.TaskEither<HttpErrorResponse, Bill>
