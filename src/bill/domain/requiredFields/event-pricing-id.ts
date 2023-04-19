import { isEventPricingId } from '@bill/domain/requiredFields/is/is-event-pricing'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EventPricingIdBrand = {
  readonly EventPricingId: unique symbol
}

export const EventPricingIdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EventPricingIdBrand> => isEventPricingId(value),
    'EventPricingId'
  ),
  () => 'EventPricingId'
)

const IntersectEventPricingId = t.intersection([t.string, EventPricingIdCodec])

export type EventPricingId = t.TypeOf<typeof IntersectEventPricingId>
