declare module 'ingadi' {
  export interface Address {
    address1: string
    address2: string
    city: string
    postalCode: string
    province: string
    country: string
    createdAt: string
    updatedAt: string
  }

  export interface Client {
    id: string
    name: string
    email: string
    phoneNumber: string
    address: Address
    createdAt: string
    updatedAt: string
  }

  export interface ClientEntity {
    _id: any
    name: string
    email: string
    phoneNumber: string
    address: Address
    createdAt: string
    updatedAt: string
  }
}
