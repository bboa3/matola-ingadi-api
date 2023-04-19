import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceIdCodeCodec } from '@bill/domain/requiredFields/invoice-id'
import * as t from 'io-ts'

export const CreateBillDocumentPropsCodec = t.type({
  billId: IdCodec,
  invoiceId: InvoiceIdCodeCodec,
  userId: IdCodec
})

export type CreateBillDocumentProps = t.TypeOf<typeof CreateBillDocumentPropsCodec>
