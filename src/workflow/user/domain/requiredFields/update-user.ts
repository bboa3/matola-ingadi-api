import { AddressCodec } from '@user/domain/requiredFields/address'
import { IdCodec } from '@user/domain/requiredFields/id'
import { NameCodec } from '@user/domain/requiredFields/name'
import { PhoneNumberCodec } from '@user/domain/requiredFields/phone-number'
import { UrlCodec } from '@user/domain/requiredFields/url'
import * as t from 'io-ts'

export const UpdateUserPropsCodec = t.type({
  userId: IdCodec,
  name: t.union([NameCodec, t.undefined]),
  phoneNumber: t.union([PhoneNumberCodec, t.undefined]),
  image: t.union([UrlCodec, t.undefined]),
  address: t.union([AddressCodec, t.undefined])
})

export type UpdateUserProps = t.TypeOf<typeof UpdateUserPropsCodec>
