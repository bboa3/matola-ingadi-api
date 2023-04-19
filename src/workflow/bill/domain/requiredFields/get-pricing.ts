import { IdCodec } from '@bill/domain/requiredFields/id'
import { LocaleCodec } from '@core/domain/requiredFields/locale'
import * as t from 'io-ts'

export const GetPricingPropsCodec = t.type({
  id: IdCodec,
  locale: LocaleCodec
})

export type GetPricingProps = t.TypeOf<typeof GetPricingPropsCodec>
