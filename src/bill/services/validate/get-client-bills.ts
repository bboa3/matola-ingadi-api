import { GetClientBillsPropsValidator } from '@bill/domain/Contracts/GetClientBills'
import { GetClientBillsPropsCodec } from '@bill/domain/requiredFields/get-client-bills'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getClientBillsPropsValidator: GetClientBillsPropsValidator = (data) => {
  return pipe(
    data,
    GetClientBillsPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
