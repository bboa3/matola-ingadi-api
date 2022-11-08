import { EventTypeCodec } from '@bill/domain/requiredFields/event-type'
import { UrlCodec } from '@bill/domain/requiredFields/url'
import { DescriptionCodec } from '@design/domain/requiredFields/description'
import { IdCodec } from '@user/domain/requiredFields/id'
import { NameCodec } from '@user/domain/requiredFields/name'
import * as t from 'io-ts'

export const UpdateTestimonialPropsCodec = t.type({
  testimonialId: IdCodec,
  name: NameCodec,
  image: UrlCodec,
  description: DescriptionCodec,
  eventType: EventTypeCodec
})

export type UpdateTestimonialProps = t.TypeOf<typeof UpdateTestimonialPropsCodec>
