import { DeleteReservedEventDateByBillIdDB } from '@bill/domain/Contracts/DeleteReservedEventDateByBillId'
import { FindActiveBillsDB } from '@bill/domain/Contracts/FindBills'
import { UpdateBillDB } from '@bill/domain/Contracts/UpdateBill'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import * as TE from 'fp-ts/lib/TaskEither'

export type DisableBillsService = (db: UpdateBillDB) => (db: DeleteReservedEventDateByBillIdDB) =>
(db: FindActiveBillsDB) => TE.TaskEither<HttpErrorResponse, void>
