import { isInvoiceNumberCode } from '@bill/domain/requiredFields/is/is-invoice-number'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type InvoiceNumberCodeBrand = {
  readonly InvoiceNumberCode: unique symbol
}

export const InvoiceNumberCodeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, InvoiceNumberCodeBrand> => isInvoiceNumberCode(value),
    'InvoiceNumberCode'
  ),
  () => 'InvoiceNumberCode'
)

const IntersectInvoiceNumberCode = t.intersection([t.string, InvoiceNumberCodeCodec])

export type InvoiceNumberCode = t.TypeOf<typeof IntersectInvoiceNumberCode>
