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

  export type InvoiceIdEntity = {
    _id: any
    code: string
    createdAt: string
  }

  export interface EventTypeEntity {
    _id: any
    name: string
  }

  export interface EventService {
    numberOfGuests: number
    eventType: string
    eventDate: string
    total: number
    eventPricingId: string
  }

  export type PaymentMethodId = 'mpesa' | '24' | 'cash' | 'check'

  export interface PaymentMethod {
    id: PaymentMethodId
    name: string
    commission: {
      model: 'PERCENTAGE' | 'VALUE'
      value: number
    }
  }

  export interface BillPaymentMethod {
    id: string
    name: string
    commission: {
      model: string
      value: number
    },
    totalCommission: number
  }

  export type InvoiceStatus = 'PENDING' | 'COMPLETED' | 'FAILED'
  export type BillStatus = 'ACTIVE' | 'DISABLED'

  export interface Transaction {
    status: InvoiceStatus
    reference: string
    confirmationImage?: Photo
    confirmedBy?: string
    details?: string
    startedAt: string
    completedAt?: string
  }

  export interface Invoice {
    invoiceId: InvoiceIdEntity
    service: EventService
    subTotal: number
    discount: number
    total: number
    status: InvoiceStatus
    paymentMethod: BillPaymentMethod
    transaction?: Transaction
    dueAt: string
    createdAt: string
  }

  export interface BillEntity {
    _id: any
    userId: string
    services: EventService[]
    subTotal: number
    discount: number
    total: number
    defaultPaymentMethodId: PaymentMethodId
    invoices: Invoice[]
    status: BillStatus
    createdAt: string
  }

  export interface Bill {
    userId: string
    services: EventService[]
    subTotal: number
    discount: number
    total: number
    defaultPaymentMethodId: PaymentMethodId
    invoices: Invoice[]
    status: BillStatus
    createdAt: string
  }

  export interface ViewBill extends Bill {
    id: string
  }
}
