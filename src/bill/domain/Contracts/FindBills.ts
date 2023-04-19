import { Id } from '@bill/domain/requiredFields/id'
import { ViewBill } from 'bill'

export type FindBillByIdDB = (data: Id) => Promise<ViewBill>

export type FindActiveBillsDB = () => Promise<ViewBill[]>
