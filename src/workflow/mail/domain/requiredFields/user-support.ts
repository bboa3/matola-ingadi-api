import { EmailCodec } from '@mail/domain/requiredFields/email'
import { MessageCodec } from '@mail/domain/requiredFields/message'
import { NameCodec } from '@mail/domain/requiredFields/name'
import { PhoneNumberCodec } from '@mail/domain/requiredFields/phone-number'
import * as t from 'io-ts'

export const UserSupportPropsCodec = t.type({
  name: NameCodec,
  email: EmailCodec,
  phoneNumber: PhoneNumberCodec,
  service: NameCodec,
  message: MessageCodec
})

export type UserSupportProps = t.TypeOf<typeof UserSupportPropsCodec>
