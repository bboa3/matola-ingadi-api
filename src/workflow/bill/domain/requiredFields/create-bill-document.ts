import { IdCodec } from '@bill/domain/requiredFields/id'
import * as t from 'io-ts'

export const CreateBillDocumentPropsCodec = t.type({
  id: IdCodec,
  clientId: IdCodec
})

export type CreateBillDocumentProps = t.TypeOf<typeof CreateBillDocumentPropsCodec>
