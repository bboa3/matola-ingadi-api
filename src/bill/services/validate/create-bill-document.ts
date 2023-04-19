import { CreateBillDocumentPropsValidator } from '@bill/domain/Contracts/CreateBillDocument'
import { CreateBillDocumentPropsCodec } from '@bill/domain/requiredFields/create-bill-document'
import { ValidationError } from '@core/domain/errors/validation_error'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const createBillDocumentPropsValidator: CreateBillDocumentPropsValidator = (data) => {
  return pipe(
    data,
    CreateBillDocumentPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
