import { CreateBillProps } from '@bill/domain/requiredFields/create-bill'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Address, Bill, Invoice, PreBill } from 'billing'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  userId: string
  guestsNumber: string
  period: string
  pricingId: string
  name: string
  email: string
  phoneNumber: string
  paymentMethod: string
  paymentGatewayFee: number
  address: Address
}

export type CreateBillPropsValidator = (data: Data) => E.Either<ValidationError, CreateBillProps>

export type CreateBillDB = (data: PreBill) => Promise<Bill>

export type CreateBillService = (db: CreateBillDB) => (data: Invoice)
=> (data: CreateBillProps) => TE.TaskEither<HttpErrorResponse, Bill>
