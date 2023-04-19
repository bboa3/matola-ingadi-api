import { ReservedEventDate } from 'bill'

interface Data {
  date: string
  billId: string
}

export type ReserveEventDateDB = (data: Data) => Promise<ReservedEventDate>
