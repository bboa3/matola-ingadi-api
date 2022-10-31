import { ValidationError } from '@core/domain/errors/validation_error'
import { UpdateUserPropsValidator } from '@user/domain/Contracts/UpdateUser'
import { UpdateUserPropsCodec } from '@user/domain/requiredFields/update-user'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const updateUserPropsValidator: UpdateUserPropsValidator = (data) => {
  return pipe(
    data,
    UpdateUserPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
