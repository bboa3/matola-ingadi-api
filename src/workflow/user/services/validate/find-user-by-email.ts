import { ValidationError } from '@core/domain/errors/validation_error'
import { FindUserByEmailPropsValidator } from '@user/domain/Contracts/FindUserByEmail'
import { FindUserByEmailPropsCodec } from '@user/domain/requiredFields/find-user-by-email'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const findUserByEmailPropsValidator: FindUserByEmailPropsValidator = (data) => {
  return pipe(
    data,
    FindUserByEmailPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
