import { GetBillPropsValidator } from '@bill/domain/Contracts/GetBill'
import { GetBillPropsCodec } from '@bill/domain/requiredFields/get-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getBillPropsValidator: GetBillPropsValidator = (data) => {
  return pipe(
    data,
    GetBillPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
