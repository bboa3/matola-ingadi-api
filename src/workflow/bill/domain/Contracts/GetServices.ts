import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Pricing } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

export type GetServicesDB = () => Promise<Pricing[]>

export type GetServicesService = (db: GetServicesDB) => TE.TaskEither<HttpErrorResponse, Pricing[]>
