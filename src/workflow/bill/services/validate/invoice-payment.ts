import { InvoicePaymentPropsValidator } from '@bill/domain/Contracts/InvoicePayment'
import { InvoicePaymentPropsCodec } from '@bill/domain/requiredFields/invoice-payment'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const invoicePaymentPropsValidator: InvoicePaymentPropsValidator = (data) => {
  return pipe(
    data,
    InvoicePaymentPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
