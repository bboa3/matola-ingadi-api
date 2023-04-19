import { deleteReservedEventDateByBillIdDB } from '@bill/domain/entities/delete-reserve-event-date-by-bill-id'
import { findActiveBillsDB } from '@bill/domain/entities/find-active-bills'
import { updateBillDB } from '@bill/domain/entities/update-bill'
import { disableBillsService } from '@bill/services/disable-bills'

import { pipe } from 'fp-ts/lib/function'

export const disableBillsUseCase = () => {
  const httpResponse = pipe(
    disableBillsService(updateBillDB)(deleteReservedEventDateByBillIdDB)(findActiveBillsDB)
  )

  return httpResponse
}
