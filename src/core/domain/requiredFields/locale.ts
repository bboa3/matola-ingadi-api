import { isLocale } from '@core/domain/requiredFields/is/is-locale'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type LocaleBrand = {
  readonly Locale: unique symbol
}

export const LocaleCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, LocaleBrand> => isLocale(value),
    'Locale'
  ),
  () => 'Locale'
)

const IntersectLocale = t.intersection([t.string, LocaleCodec])

export type Locale = t.TypeOf<typeof IntersectLocale>
