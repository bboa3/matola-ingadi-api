import { DateCodec } from '@bill/domain/requiredFields/date'
import { EventPricingIdCodec } from '@bill/domain/requiredFields/event-pricing-id'
import { EventTypeCodec } from '@bill/domain/requiredFields/event-type'
import { GuestsNumberCodec } from '@bill/domain/requiredFields/guests-number'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { PaymentMethodIdCodec } from '@bill/domain/requiredFields/payment-method-id'
import * as t from 'io-ts'

export const CreateBillPropsCodec = t.type({
  userId: IdCodec,
  guestsNumber: GuestsNumberCodec,
  discount: t.number,
  eventPricingId: EventPricingIdCodec,
  eventType: EventTypeCodec,
  paymentMethodId: PaymentMethodIdCodec,
  eventDate: DateCodec
})

export type CreateBillProps = t.TypeOf<typeof CreateBillPropsCodec>
