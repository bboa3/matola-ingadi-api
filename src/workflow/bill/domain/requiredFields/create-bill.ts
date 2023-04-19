import { AddressCodec } from '@bill/domain/requiredFields/address'
import { DateCodec } from '@bill/domain/requiredFields/date'
import { EmailCodec } from '@bill/domain/requiredFields/email'
import { EventTypeCodec } from '@bill/domain/requiredFields/event-type'
import { GuestsNumberCodec } from '@bill/domain/requiredFields/guests-number'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { NameCodec } from '@bill/domain/requiredFields/name'
import { PaymentMethodCodec } from '@bill/domain/requiredFields/payment-method'
import { PhoneNumberCodec } from '@bill/domain/requiredFields/phone-number'
import * as t from 'io-ts'

export const CreateBillPropsCodec = t.type({
  userId: IdCodec,
  name: NameCodec,
  email: EmailCodec,
  phoneNumber: PhoneNumberCodec,
  address: AddressCodec,
  guestsNumber: GuestsNumberCodec,
  eventType: EventTypeCodec,
  eventDate: DateCodec,
  pricingId: IdCodec,
  paymentMethod: PaymentMethodCodec,
  paymentGatewayFee: t.number
})

export type CreateBillProps = t.TypeOf<typeof CreateBillPropsCodec>
