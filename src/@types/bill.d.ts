declare module 'bill' {
  export interface Photo {
    alt: string
    url: string
  }

  export interface Services {
    name: string
    description: string
    photos: Photo[]
  }

  export interface Pricing {
    id: string
    name: string
    pricingModel: string
    price: number
    services: Services[]
  }

  export interface PricingEntity {
    _id: any
    name: string
    'pricing_model': string
    price: number
    services: Services[]
  }

  export interface ServiceProvider {
    id: string
    name: string
    phoneNumber: number
  }

  export interface ServiceProviderEntity {
    _id: any
    name: string
    'phone_number': number
  }

  export interface EventType {
    id: string
    name: string
  }

  export interface EventTypeEntity {
    _id: any
    name: string
  }

  export type BillStatus = 'PENDING' | 'PAYED' | 'FAILED'

  export interface BillConfirmation {
    status: BillStatus
    payedAt?: string
    confirmationImage?: Photo
    confirmedBy?: string
    details?: string
  }

  export interface BillEvent {
    numberOfGuests: number
    eventType: string
    total: number
  }

  export interface BillEntity {
    _id: any
    clientId: string
    createAt: string
    dueAt: string
    event: BillEvent
    subTotal: number
    discount: number
    total: number
    confirmation: BillConfirmation
  }

  export interface Bill {
    createAt: string
    clientId: string
    dueAt: string
    event: BillEvent
    subTotal: number
    discount: number
    total: number
    confirmation: BillConfirmation
  }

  export interface ViewBill extends Bill {
    id: string
  }
}
