declare module 'billing' {
  export type Locale = 'pt' | 'en'
  export interface Locales {
    pt: string
    en: string
  }
  export interface Photo {
    alt: string
    url: string
  }

  export interface Commission {
    model: string
    value: number
  }

  export type ActivityId = 'events-hall'

  export interface ActivityEntity {
    id: ActivityId
    name: Locales
  }

  export interface Activity {
    id: ActivityId
    name: string
  }

  export interface ServiceEntity {
    _id: any
    description: Locales
  }

  export interface Service {
    id: string
    description: string
    photos: Photo[]
  }

  export interface Address {
    cityOrDistrict: string
    provinceOrState: string
    country: string
  }

  export interface DiscountEntity {
    other?: {
      id: string
      name: Locales
      percentage: number
    }
  }

  export interface Discount {
    other?: {
      id: string
      name: string
      percentage: number
    }
  }

  export interface PricingEntity {
    _id: any
    name: Locales
    activity: ActivityEntity
    price: number
    baseGuestsNumber: number
    discount: DiscountEntity
    services: {
      id: string
      description: Locales
      photos: Photo[]
    }[]
  }

  export interface Pricing {
    id: string
    name: string
    activity: Activity
    price: number
    baseGuestsNumber: number
    discount: Discount
    services: Service[]
  }

  export type InvoiceIdEntity = {
    _id: any
    code: string
    createdAt: string
    updatedAt: string
  }

  export type InvoiceStatus = 'PENDING' | 'PAID' | 'FAILED'
  export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'
  export type BillStatus = 'ACTIVE' | 'DISABLED'
  export type EventDateStatus = 'PENDING' | 'RESERVED'

  export type TransactionType = 'date-reservation' | 'remaining-payment'

  export interface Transaction {
    id: string
    transactionType: TransactionType
    status: TransactionStatus
    paymentMethod: string
    invoicePercentage: number
    subTotal: number
    total: number
    paymentGatewayFee: number
    confirmedBy?: string
    details?: string
    transactionDate?: string
    dueAt: string
    updatedAt: string
    createdAt: string
  }

  export interface Invoice {
    invoiceCode: string
    activity: Activity
    eventType: string
    pricingId: string
    guestsNumber: number
    subTotal: number
    discounted: number
    total: number
    invoiceStatus: InvoiceStatus
    transactions: Transaction[]
    services: string[]
    eventDate: string
    createdAt: string
    updatedAt: string
  }

  export interface PreBill {
    userId: string
    name: string
    email: string
    phoneNumber: string
    address: Address
    activity: Activity
    guestsNumber: number
    invoices: Invoice[]
    status: BillStatus
    createdAt: string
    updatedAt: string
  }

  export interface BillEntity extends PreBill {
    _id: any
  }

  export interface Bill extends PreBill {
    id: string
  }

  export interface EventDate {
    id: string
    date: string
    invoiceCode: string
    status: EventDateStatus
    updatedAt: string
    createdAt: string
  }

  export interface EventDateEntity {
    _id: any
    date: string
    invoiceCode: string
    status: EventDateStatus
    updatedAt: string
    createdAt: string
  }
}
