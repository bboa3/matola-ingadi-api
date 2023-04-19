import { Id } from '@bill/domain/requiredFields/id'
import { Bill } from 'billing'

export type FindBillByIdDB = (data: Id) => Promise<Bill>

export type FindBillsDB = () => Promise<Bill[]>
