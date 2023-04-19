import { LocaleCodec } from '@core/domain/requiredFields/locale'
import * as t from 'io-ts'

export const GetServicesPricingPropsCodec = t.type({
  locale: LocaleCodec
})

export type GetServicesPricingProps = t.TypeOf<typeof GetServicesPricingPropsCodec>
