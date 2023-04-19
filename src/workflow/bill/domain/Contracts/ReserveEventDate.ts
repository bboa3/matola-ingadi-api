import { EventDate, EventDateStatus } from 'billing'

interface Data {
  date: string
  invoiceCode: string
  status: EventDateStatus
}

export type ReserveEventDateDB = (data: Data) => Promise<EventDate>
