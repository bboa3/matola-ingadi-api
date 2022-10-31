import { isInvoiceIdCode } from '@bill/domain/requiredFields/is/is-invoice-id'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type InvoiceIdCodeBrand = {
  readonly InvoiceIdCode: unique symbol
}

export const InvoiceIdCodeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, InvoiceIdCodeBrand> => isInvoiceIdCode(value),
    'InvoiceIdCode'
  ),
  () => 'InvoiceIdCode'
)

const IntersectInvoiceIdCode = t.intersection([t.string, InvoiceIdCodeCodec])

export type InvoiceIdCode = t.TypeOf<typeof IntersectInvoiceIdCode>
