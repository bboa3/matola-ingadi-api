import { Id } from '@bill/domain/requiredFields/id'
import { Locale, Pricing } from 'billing'

interface Data {
  id: Id
  locale: Locale
}

export type FindPricingByIdDB = (data: Data) => Promise<Pricing>
