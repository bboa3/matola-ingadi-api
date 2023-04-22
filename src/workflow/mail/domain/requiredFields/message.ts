import { isMessage } from '@mail/domain/requiredFields/is/is-massage'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type MessageBrand = {
  readonly Message: unique symbol
}

export const MessageCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, MessageBrand> => isMessage(value),
    'Message'
  ),
  () => 'Message'
)

const IntersectMessage = t.intersection([t.string, MessageCodec])

export type Message = t.TypeOf<typeof IntersectMessage>
