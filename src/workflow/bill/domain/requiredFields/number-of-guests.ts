import { isNumberOfGuests } from '@bill/domain/requiredFields/is/is-number-of-guests'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type NumberOfGuestsBrand = {
  readonly NumberOfGuests: unique symbol
}

export const NumberOfGuestsCodec = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, NumberOfGuestsBrand> => isNumberOfGuests(value),
    'NumberOfGuests'
  ),
  () => 'NumberOfGuests'
)

const IntersectNumberOfGuests = t.intersection([t.number, NumberOfGuestsCodec])

export type NumberOfGuests = t.TypeOf<typeof IntersectNumberOfGuests>
