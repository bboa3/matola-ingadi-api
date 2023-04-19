import { GetUserBillPropsValidator } from '@bill/domain/Contracts/GetUserBill'
import { GetUserBillPropsCodec } from '@bill/domain/requiredFields/get-user-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getUserBillPropsValidator: GetUserBillPropsValidator = (data) => {
  return pipe(
    data,
    GetUserBillPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
