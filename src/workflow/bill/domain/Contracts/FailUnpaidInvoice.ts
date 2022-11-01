import { FindActiveBillsDB } from '@bill/domain/Contracts/FindBills'
import { UpdateBillDB } from '@bill/domain/Contracts/UpdateBill'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import * as TE from 'fp-ts/lib/TaskEither'

export type FailUnpaidInvoiceService = (db: UpdateBillDB) =>
(db: FindActiveBillsDB) => TE.TaskEither<HttpErrorResponse, void>
