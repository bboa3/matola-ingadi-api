import { isMaxNumber } from '@bill/domain/requiredFields/is/is-max-number'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type MaxNumberBrand = {
  readonly MaxNumber: unique symbol
}

export const MaxNumberCodec = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, MaxNumberBrand> => isMaxNumber(value),
    'MaxNumber'
  ),
  () => 'MaxNumber'
)

const IntersectMaxNumber = t.intersection([t.number, MaxNumberCodec])

export type MaxNumber = t.TypeOf<typeof IntersectMaxNumber>
