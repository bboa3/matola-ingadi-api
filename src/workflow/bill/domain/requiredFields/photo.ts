import { DescriptionCodec } from '@bill/domain/requiredFields/description'
import { UrlCodec } from '@bill/domain/requiredFields/url'
import * as t from 'io-ts'

export const PhotoCodec = t.type({
  alt: DescriptionCodec,
  url: UrlCodec
})

export type Photo = t.TypeOf<typeof PhotoCodec>
