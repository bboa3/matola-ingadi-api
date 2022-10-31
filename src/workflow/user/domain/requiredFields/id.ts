import { isId } from '@bill/domain/requiredFields/is/is-id'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type IdBrand = {
  readonly Id: unique symbol
}

export const IdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IdBrand> => isId(value),
    'Id'
  ),
  () => 'Id'
)

const IntersectId = t.intersection([t.string, IdCodec])

export type Id = t.TypeOf<typeof IntersectId>
