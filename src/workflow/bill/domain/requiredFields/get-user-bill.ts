import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetUserBillPropsCodec = t.type({
  id: IdCodec,
  userId: IdCodec
})

export type GetUserBillProps = t.TypeOf<typeof GetUserBillPropsCodec>
