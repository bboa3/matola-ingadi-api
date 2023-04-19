import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetUserBillsPropsCodec = t.type({
  userId: IdCodec
})

export type GetUserBillsProps = t.TypeOf<typeof GetUserBillsPropsCodec>
