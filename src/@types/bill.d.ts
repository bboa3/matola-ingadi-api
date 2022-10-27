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
    eventPricingId: string
  }

  export interface PaymentMethod {
    id: string
    name: string
    commission: {
      model: string
      value: number
    }
  }

  export interface BillEntity {
    _id: any
    serie: string
    clientId: string
    createAt: string
    dueAt: string
    event: BillEvent
    subTotal: number
    discount: number
    total: number
    paymentMethod: PaymentMethod
    confirmation: BillConfirmation
  }

  export interface Bill {
    serie: string
    createAt: string
    clientId: string
    dueAt: string
    event: BillEvent
    subTotal: number
    discount: number
    total: number
    paymentMethod: PaymentMethod
    confirmation: BillConfirmation
  }

  export interface ViewBill extends Bill {
    id: string
  }
}
