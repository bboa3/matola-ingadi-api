import { GetUserBillsPropsValidator } from '@bill/domain/Contracts/GetUserBills'
import { GetUserBillsPropsCodec } from '@bill/domain/requiredFields/get-user-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getUserBillsPropsValidator: GetUserBillsPropsValidator = (data) => {
  return pipe(
    data,
    GetUserBillsPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
