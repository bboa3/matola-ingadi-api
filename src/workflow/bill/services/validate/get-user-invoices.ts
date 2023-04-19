import { GetUserInvoicesPropsValidator } from '@bill/domain/Contracts/GetUserInvoices'
import { GetUserInvoicesPropsCodec } from '@bill/domain/requiredFields/get-user-invoices'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getUserInvoicesPropsValidator: GetUserInvoicesPropsValidator = (data) => {
  return pipe(
    data,
    GetUserInvoicesPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
