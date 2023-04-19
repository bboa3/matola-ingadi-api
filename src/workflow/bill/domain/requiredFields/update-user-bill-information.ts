import { AddressCodec } from '@bill/domain/requiredFields/address'
import { EmailCodec } from '@bill/domain/requiredFields/email'
import { GuestsNumberCodec } from '@bill/domain/requiredFields/guests-number'
import { IdCodec } from '@bill/domain/requiredFields/id'
import { NameCodec } from '@bill/domain/requiredFields/name'
import { PhoneNumberCodec } from '@bill/domain/requiredFields/phone-number'
import * as t from 'io-ts'

export const UpdateUserBillInformationPropsCodec = t.type({
  userId: IdCodec,
  billId: IdCodec,
  name: t.union([NameCodec, t.undefined]),
  email: t.union([EmailCodec, t.undefined]),
  phoneNumber: t.union([PhoneNumberCodec, t.undefined]),
  address: t.union([AddressCodec, t.undefined]),
  guestsNumber: t.union([GuestsNumberCodec, t.undefined])
})

export type UpdateUserBillInformationProps = t.TypeOf<typeof UpdateUserBillInformationPropsCodec>
