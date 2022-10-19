import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetBillPropsCodec = t.type({
  id: IdCodec,
  clientId: IdCodec
})

export type GetBillProps = t.TypeOf<typeof GetBillPropsCodec>
