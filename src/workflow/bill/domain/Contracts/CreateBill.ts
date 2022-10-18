import { CreateBillProps } from '@bill/domain/requiredFields/create-bill'
import { Id } from '@bill/domain/requiredFields/id'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Bill, Pricing, ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  clientId: string
  numberOfGuests: number
  discount: number
  eventPricingId: string
  eventType: string
}

export type CreateBillPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillProps>

export type CreateBillDB = (data: Bill) => Promise<ViewBill>
export type GetEventPricingDB = (id: Id) => Promise<Pricing>

export type CreateBillService = (db: CreateBillDB) => (db: GetEventPricingDB) =>
(data: CreateBillProps) => TE.TaskEither<HttpErrorResponse, ViewBill>
