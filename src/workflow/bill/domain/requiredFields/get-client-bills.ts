import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetClientBillsPropsCodec = t.type({
  clientId: IdCodec
})

export type GetClientBillsProps = t.TypeOf<typeof GetClientBillsPropsCodec>
