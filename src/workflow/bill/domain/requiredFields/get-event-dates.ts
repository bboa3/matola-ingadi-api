import { MaxNumberCodec } from '@bill/domain/requiredFields/max-number'
import * as t from 'io-ts'

export const GetEventDatesPropsCodec = t.type({
  maxNumber: MaxNumberCodec
})

export type GetEventDatesProps = t.TypeOf<typeof GetEventDatesPropsCodec>
