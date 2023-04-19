import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import { Date } from '@bill/domain/requiredFields/date'
import { EventType } from '@bill/domain/requiredFields/event-type'
import { GuestsNumber } from '@bill/domain/requiredFields/guests-number'
import { Id } from '@bill/domain/requiredFields/id'
import { PaymentMethod } from '@bill/domain/requiredFields/payment-method'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Invoice } from 'billing'
import * as TE from 'fp-ts/lib/TaskEither'

interface CreateInvoicesProps {
  pricingId: Id
  guestsNumber: GuestsNumber
  eventType: EventType
  eventDate: Date
  paymentGatewayFee: number
  paymentMethod: PaymentMethod
}

export type CreateInvoiceNumberDB = () => Promise<string>

export type CreateInvoicesService = (db: CreateInvoiceNumberDB) => (db: FindPricingByIdDB)
=> (data: CreateInvoicesProps) => TE.TaskEither<HttpErrorResponse, Invoice>
