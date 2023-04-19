import { GetInvoicePropsValidator } from '@bill/domain/Contracts/GetInvoice'
import { GetInvoicePropsCodec } from '@bill/domain/requiredFields/get-invoice'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const getInvoicePropsValidator: GetInvoicePropsValidator = (data) => {
  return pipe(
    data,
    GetInvoicePropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
