import { isGuestsNumber } from '@bill/domain/requiredFields/is/is-guests-number'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type GuestsNumberBrand = {
  readonly GuestsNumber: unique symbol
}

export const GuestsNumberCodec = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, GuestsNumberBrand> => isGuestsNumber(value),
    'GuestsNumber'
  ),
  () => 'GuestsNumber'
)

const IntersectGuestsNumber = t.intersection([t.number, GuestsNumberCodec])

export type GuestsNumber = t.TypeOf<typeof IntersectGuestsNumber>
