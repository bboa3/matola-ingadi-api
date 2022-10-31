import { EmailCodec } from '@user/domain/requiredFields/email'
import * as t from 'io-ts'

export const FindUserByEmailPropsCodec = t.type({
  email: EmailCodec
})

export type FindUserByEmailProps = t.TypeOf<typeof FindUserByEmailPropsCodec>
