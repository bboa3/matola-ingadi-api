import { EventDate, EventDateStatus } from 'billing'

interface Data {
  invoiceCode: string
  status: EventDateStatus
}

export type UpdateEventDateDB = (data: Data) => Promise<EventDate>
