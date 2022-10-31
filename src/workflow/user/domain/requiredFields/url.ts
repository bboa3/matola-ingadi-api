import { isUrl } from '@user/domain/requiredFields/is/is-url'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type UrlBrand = {
  readonly Url: unique symbol
}

export const UrlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isUrl(value),
    'Url'
  ),
  () => 'Image Url'
)

const IntersectUrl = t.intersection([t.string, UrlCodec])

export type Url = t.TypeOf<typeof IntersectUrl>
