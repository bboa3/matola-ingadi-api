declare module 'ingadi' {
  export interface Session {
    id: string
    sessionToken: string
    userId: string
    expires: string
  }

  export interface SessionEntity {
    _id: any
    sessionToken: string
    userId: string
    expires: string
  }

  export interface Address {
    address1: string
    streetAddress: string
    cityOrDistrict: string
    provinceOrState: string
    postalCode: string
    country: string
    updatedAt: string
  }

  export interface User {
    id: string
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    address?: Address
    updatedAt: string
  }

  export interface UserEntity {
    _id: any
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    address?: Address
    updatedAt: string
  }
}
