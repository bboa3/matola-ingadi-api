import { DescriptionCodec } from '@bill/domain/requiredFields/description'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceIdCodeCodec } from '@bill/domain/requiredFields/invoice-id'
import { PaymentMethodIdCodec } from '@bill/domain/requiredFields/payment-method-id'
import { PhotoCodec } from '@bill/domain/requiredFields/photo'
import * as t from 'io-ts'

export const ConfirmPaymentByAdminPropsCodec = t.type({
  adminId: IdCodec,
  billId: IdCodec,
  invoiceId: InvoiceIdCodeCodec,
  paymentMethodId: PaymentMethodIdCodec,
  confirmationImage: PhotoCodec,
  details: DescriptionCodec
})

export type ConfirmPaymentByAdminProps = t.TypeOf<typeof ConfirmPaymentByAdminPropsCodec>
