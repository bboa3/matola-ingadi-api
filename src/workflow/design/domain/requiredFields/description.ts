import { isDescription } from '@design/domain/requiredFields/is/is-description'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type DescriptionBrand = {
  readonly Description: unique symbol
}

export const DescriptionCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, DescriptionBrand> => isDescription(value),
    'Description'
  ),
  () => 'Description'
)

const IntersectDescription = t.intersection([t.string, DescriptionCodec])

export type Description = t.TypeOf<typeof IntersectDescription>
