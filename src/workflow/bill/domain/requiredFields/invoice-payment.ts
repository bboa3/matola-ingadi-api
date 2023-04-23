import { DateCodec } from '@bill/domain/requiredFields/date'
import { DescriptionCodec } from '@bill/domain/requiredFields/description'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceCodeCodec } from '@bill/domain/requiredFields/invoice-code'
import { NameCodec } from '@bill/domain/requiredFields/name'
import { PaymentMethodCodec } from '@bill/domain/requiredFields/payment-method'
import * as t from 'io-ts'

export const InvoicePaymentPropsCodec = t.type({
  userId: IdCodec,
  invoiceCode: InvoiceCodeCodec,
  billId: IdCodec,
  transactionId: NameCodec,
  paymentMethod: PaymentMethodCodec,
  paymentGatewayFee: t.number,
  confirmedBy: NameCodec,
  details: DescriptionCodec,
  transactionDate: DateCodec
})

export type InvoicePaymentProps = t.TypeOf<typeof InvoicePaymentPropsCodec>
