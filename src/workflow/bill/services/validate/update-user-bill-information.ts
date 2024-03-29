import { UpdateUserBillInformationPropsValidator } from '@bill/domain/Contracts/UpdateUserBillInformation'
import { UpdateUserBillInformationPropsCodec } from '@bill/domain/requiredFields/update-user-bill-information'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const updateUserBillInformationPropsValidator: UpdateUserBillInformationPropsValidator = (data) => {
  return pipe(
    data,
    UpdateUserBillInformationPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
