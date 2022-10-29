import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceNumberCodeCodec } from '@bill/domain/requiredFields/invoice-number'
import * as t from 'io-ts'

export const CreateBillDocumentPropsCodec = t.type({
  billId: IdCodec,
  invoiceNumber: InvoiceNumberCodeCodec,
  clientId: IdCodec
})

export type CreateBillDocumentProps = t.TypeOf<typeof CreateBillDocumentPropsCodec>
