import { isInvoiceCode } from '@bill/domain/requiredFields/is/is-invoice-code'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type InvoiceCodeBrand = {
  readonly InvoiceCode: unique symbol
}

export const InvoiceCodeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, InvoiceCodeBrand> => isInvoiceCode(value),
    'InvoiceCode'
  ),
  () => 'InvoiceCode'
)

const IntersectInvoiceCode = t.intersection([t.string, InvoiceCodeCodec])

export type InvoiceCode = t.TypeOf<typeof IntersectInvoiceCode>
