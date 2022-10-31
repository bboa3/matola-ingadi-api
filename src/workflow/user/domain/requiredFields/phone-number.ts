import { isPhoneNumber } from '@user/domain/requiredFields/is/is-phone-number'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PhoneNumberBrand = {
  readonly PhoneNumber: unique symbol
}

export const PhoneNumberCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PhoneNumberBrand> => isPhoneNumber(value),
    'PhoneNumber'
  ),
  () => 'PhoneNumber'
)

const IntersectPhoneNumber = t.intersection([t.string, PhoneNumberCodec])

export type PhoneNumber = t.TypeOf<typeof IntersectPhoneNumber>
