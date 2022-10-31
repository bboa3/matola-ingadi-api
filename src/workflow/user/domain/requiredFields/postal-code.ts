import { isPostalCode } from '@user/domain/requiredFields/is/is-postal-code'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PostalCodeBrand = {
  readonly PostalCode: unique symbol
}

export const PostalCodeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PostalCodeBrand> => isPostalCode(value),
    'PostalCode'
  ),
  () => 'PostalCode'
)

const IntersectPostalCode = t.intersection([t.string, PostalCodeCodec])

export type PostalCode = t.TypeOf<typeof IntersectPostalCode>
