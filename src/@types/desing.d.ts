declare module 'design' {
  export interface Photo {
    alt: string
    url: string
  }

  export interface Gallery {
    id: string
    name: string
    images: Photo[]
    description: string
    highlights: string[]
    details: string
  }

  export interface GalleryEntity {
    _id: string
    name: string
    images: Photo[]
    description: string
    highlights: string[]
    details: string
  }

  export interface Testimonial {
    id: string
    name: string
    image: string
    description: string
    eventType: string
    createdAt: string
    updatedAt: string
  }

  export interface TestimonialEntity {
    _id: string
    name: string
    image: string
    description: string
    eventType: string
  }
}
