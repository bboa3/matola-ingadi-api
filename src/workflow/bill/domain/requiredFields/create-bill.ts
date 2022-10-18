import { EventTypeCodec } from '@bill/domain/requiredFields/event-type'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { NumberOfGuestsCodec } from '@bill/domain/requiredFields/number-of-guests'
import * as t from 'io-ts'

export const CreateBillPropsCodec = t.type({
  clientId: IdCodec,
  numberOfGuests: NumberOfGuestsCodec,
  discount: t.number,
  eventPricingId: IdCodec,
  eventType: EventTypeCodec
})

export type CreateBillProps = t.TypeOf<typeof CreateBillPropsCodec>
