import { findActiveBillsDB } from '@bill/domain/entities/find-active-bills'
import { updateBillDB } from '@bill/domain/entities/update-bill'
import { failUnpaidInvoiceService } from '@bill/services/fail-unpaid-invoice'

import { pipe } from 'fp-ts/lib/function'

export const failUnpaidInvoiceUseCase = () => {
  const httpResponse = pipe(
    failUnpaidInvoiceService(updateBillDB)(findActiveBillsDB)
  )

  return httpResponse
}
