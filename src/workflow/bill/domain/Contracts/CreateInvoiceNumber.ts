import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { EventService, Invoice, InvoiceIdEntity } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

interface Props {
  service: EventService
  total: number
  eventDate: string
}

export type CreateInvoiceNumberDB = () => Promise<InvoiceIdEntity>

export type CreateInvoicesService = (db: CreateInvoiceNumberDB) => (data: Props) => TE.TaskEither<HttpErrorResponse, Invoice[]>
