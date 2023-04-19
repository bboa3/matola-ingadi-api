import { isPaymentMethodId } from '@bill/domain/requiredFields/is/is-payment-method'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PaymentMethodIdBrand = {
  readonly PaymentMethodId: unique symbol
}

export const PaymentMethodIdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PaymentMethodIdBrand> => isPaymentMethodId(value),
    'PaymentMethodId'
  ),
  () => 'PaymentMethodId'
)

const IntersectPaymentMethodId = t.intersection([t.string, PaymentMethodIdCodec])

export type PaymentMethodId = t.TypeOf<typeof IntersectPaymentMethodId>
