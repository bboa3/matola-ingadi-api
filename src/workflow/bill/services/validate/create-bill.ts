import { CreateBillPropsValidator } from '@bill/domain/Contracts/CreateBill'
import { CreateBillPropsCodec } from '@bill/domain/requiredFields/create-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const createBillPropsValidator: CreateBillPropsValidator = (data) => {
  return pipe(
    data,
    CreateBillPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
