import { ViewBill } from 'bill'

export type UpdateBillDB = (data: ViewBill) => Promise<ViewBill>
