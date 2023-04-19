import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceCodeCodec } from '@bill/domain/requiredFields/invoice-code'
import * as t from 'io-ts'

export const GetInvoicePropsCodec = t.type({
  billId: IdCodec,
  invoiceCode: InvoiceCodeCodec,
  userId: IdCodec
})

export type GetInvoiceProps = t.TypeOf<typeof GetInvoicePropsCodec>
