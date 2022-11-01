import { FindBillByIdDB } from '@bill/domain/Contracts/FindBills'
import { UpdateBillDB } from '@bill/domain/Contracts/UpdateBill'
import { ConfirmPaymentByAdminProps } from '@bill/domain/requiredFields/confirm-payment-by-admin'
import { ValidationError } from '@core/domain/errors/validation_error'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { FindUserByIdDB } from '@user/domain/Contracts/FindUserById'
import { Photo, ViewBill } from 'bill'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

interface Data {
  adminId: string
  billId: string
  invoiceId: string
  confirmationImage: Photo
  details: string
}

export type ConfirmPaymentByAdminPropsValidator = (data: Data) => E.Either<ValidationError, ConfirmPaymentByAdminProps>

export type ConfirmPaymentByAdminService = (db: UpdateBillDB) => (db: FindBillByIdDB) =>
(db: FindUserByIdDB) => (data: ConfirmPaymentByAdminProps) => TE.TaskEither<HttpErrorResponse, ViewBill>
