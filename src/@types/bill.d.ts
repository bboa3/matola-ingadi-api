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
    guestsNumber: number
    eventType: string
    eventDate: string
    total: number
    eventPricingId: string
  }

  export interface PaymentMethod {
    id: string
    name: string
    onlyAdmin: boolean
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
    paymentMethod: BillPaymentMethod
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
    transaction?: Transaction
    dueAt: string
    createdAt: string
  }

  export interface BillEntity {
    _id: any
    userId: string
    userName: string
    services: EventService
    subTotal: number
    discount: number
    total: number
    invoices: Invoice[]
    status: BillStatus
    createdAt: string
  }

  export interface Bill {
    userId: string
    userName: string
    services: EventService
    subTotal: number
    discount: number
    total: number
    invoices: Invoice[]
    status: BillStatus
  }

  export interface ViewBill extends Bill {
    id: string
    createdAt: string
  }

  export interface ReservedEventDate {
    id: string
    date: string
    billId: string
    createdAt: string
  }

  export interface ReservedEventDateEntity {
    _id: any
    date: string
    billId: string
    createdAt: string
  }
}
