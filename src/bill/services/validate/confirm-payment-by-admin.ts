import { ConfirmPaymentByAdminPropsValidator } from '@bill/domain/Contracts/ConfirmPaymentByAdmin'
import { ConfirmPaymentByAdminPropsCodec } from '@bill/domain/requiredFields/confirm-payment-by-admin'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const confirmPaymentByAdminPropsValidator: ConfirmPaymentByAdminPropsValidator = (data) => {
  return pipe(
    data,
    ConfirmPaymentByAdminPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
