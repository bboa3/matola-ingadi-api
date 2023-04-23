import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { Transaction, TransactionType } from 'billing'

interface Props {
  transactions: Transaction[]
  transactionType?: TransactionType,
  transactionId?: string
}

export function findTransaction ({ transactions, transactionType, transactionId }: Props) {
  for (const transaction of transactions) {
    if ((transaction?.id === transactionId) || (transaction?.transactionType === transactionType)) {
      return transaction
    }
  }

  throw new EntityNotFoundError('Transaction')
}
