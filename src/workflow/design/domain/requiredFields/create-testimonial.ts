import { EventTypeCodec } from '@bill/domain/requiredFields/event-type'
import { UrlCodec } from '@bill/domain/requiredFields/url'
import { DescriptionCodec } from '@design/domain/requiredFields/description'
import { NameCodec } from '@user/domain/requiredFields/name'
import * as t from 'io-ts'

export const CreateTestimonialPropsCodec = t.type({
  name: NameCodec,
  image: UrlCodec,
  description: DescriptionCodec,
  eventType: EventTypeCodec
})

export type CreateTestimonialProps = t.TypeOf<typeof CreateTestimonialPropsCodec>
