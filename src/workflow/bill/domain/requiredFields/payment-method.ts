import { isPaymentMethod } from '@bill/domain/requiredFields/is/is-payment-method'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PaymentMethodBrand = {
  readonly PaymentMethod: unique symbol
}

export const PaymentMethodCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PaymentMethodBrand> => isPaymentMethod(value),
    'PaymentMethod'
  ),
  () => 'PaymentMethod'
)

const IntersectPaymentMethod = t.intersection([t.string, PaymentMethodCodec])

export type PaymentMethod = t.TypeOf<typeof IntersectPaymentMethod>
