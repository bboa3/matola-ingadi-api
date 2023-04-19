import { isDate } from '@bill/domain/requiredFields/is/is-date'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type DateBrand = {
  readonly Date: unique symbol
}

export const DateCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, DateBrand> => isDate(value),
    'Date'
  ),
  () => 'Date'
)

const IntersectDate = t.intersection([t.string, DateCodec])

export type Date = t.TypeOf<typeof IntersectDate>
