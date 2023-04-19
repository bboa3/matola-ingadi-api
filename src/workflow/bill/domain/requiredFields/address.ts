import { NameCodec } from '@bill/domain/requiredFields/name'
import * as t from 'io-ts'

export const AddressCodec = t.type({
  cityOrDistrict: NameCodec,
  provinceOrState: NameCodec,
  country: NameCodec
})

export type Address = t.TypeOf<typeof AddressCodec>
