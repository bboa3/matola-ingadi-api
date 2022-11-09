import { IdCodec } from '@user/domain/requiredFields/id'
import * as t from 'io-ts'

export const GetTestimonialByIdPropsCodec = t.type({
  id: IdCodec
})

export type GetTestimonialByIdProps = t.TypeOf<typeof GetTestimonialByIdPropsCodec>
