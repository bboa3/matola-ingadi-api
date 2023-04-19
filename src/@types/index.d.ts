declare module 'ingadi' {
  export interface Address {
    cityOrDistrict: string
    provinceOrState: string
    country: string
  }

  export interface User {
    id: string
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    admin?: boolean
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
    admin?: boolean
    updatedAt: string
  }
}
