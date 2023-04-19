import { IdCodec } from '@bill/domain/requiredFields/id'
import { MaxNumberCodec } from '@bill/domain/requiredFields/max-number'
import * as t from 'io-ts'

export const GetUserInvoicesPropsCodec = t.type({
  userId: IdCodec,
  maxNumber: MaxNumberCodec
})

export type GetUserInvoicesProps = t.TypeOf<typeof GetUserInvoicesPropsCodec>
