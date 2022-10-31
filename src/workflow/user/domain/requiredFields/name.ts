import { isName } from '@user/domain/requiredFields/is/is-name'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type NameBrand = {
  readonly Name: unique symbol
}

export const NameCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, NameBrand> => isName(value),
    'Name'
  ),
  () => 'Name'
)

const IntersectName = t.intersection([t.string, NameCodec])

export type Name = t.TypeOf<typeof IntersectName>
