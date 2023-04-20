import { Transaction, TransactionType } from 'billing'

export function findTransaction (transactions: Transaction[], transactionType: TransactionType) {
  return transactions.find(t => t.transactionType === transactionType)!
}
