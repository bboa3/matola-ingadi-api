import { CreateInvoiceNumberDB } from '@bill/domain/Contracts/CreateInvoiceNumber'
import { ReserveEventDateDB } from '@bill/domain/Contracts/ReserveEventDate'
import { CreateBillProps } from '@bill/domain/requiredFields/create-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { FindUserByIdDB } from '@user/domain/Contracts/FindUserById'
import { Bill, ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { User } from 'ingadi'

interface Data {
  userId: string
  guestsNumber: number
  discount: number
  eventPricingId: string
  eventType: string
  eventDate: string
}

export type CreateBillPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillProps>

export type CreateBillDB = (data: Bill) => Promise<ViewBill>

export type CreateBillService = (db: CreateBillDB) => (db: CreateInvoiceNumberDB) =>(db: ReserveEventDateDB)
=> (db: FindUserByIdDB) => (data: CreateBillProps) => TE.TaskEither<HttpErrorResponse, { bill: ViewBill, user: User }>
