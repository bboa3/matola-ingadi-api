import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { PaymentMethod } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetPaymentMethodDB = () => Promise<PaymentMethod[]>

export type GetPaymentMethodService = (db: GetPaymentMethodDB) => TE.TaskEither<HttpErrorResponse, PaymentMethod[]>
