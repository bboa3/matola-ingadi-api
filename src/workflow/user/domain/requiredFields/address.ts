import { NameCodec } from '@user/domain/requiredFields/name'
import * as t from 'io-ts'

export const AddressCodec = t.type({
  address1: NameCodec,
  streetAddress: NameCodec,
  cityOrDistrict: NameCodec,
  provinceOrState: NameCodec,
  postalCode: NameCodec,
  country: NameCodec
})

export type Address = t.TypeOf<typeof AddressCodec>
