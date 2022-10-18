import { isEventType } from '@bill/domain/requiredFields/is/is-event-type'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EventTypeBrand = {
  readonly EventType: unique symbol
}

export const EventTypeCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EventTypeBrand> => isEventType(value),
    'EventType'
  ),
  () => 'EventType'
)

const IntersectEventType = t.intersection([t.string, EventTypeCodec])

export type EventType = t.TypeOf<typeof IntersectEventType>
