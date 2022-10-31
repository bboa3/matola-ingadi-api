import { InvoiceNumberEntity } from 'bill'

export type CreateInvoiceNumberDB = () => Promise<InvoiceNumberEntity>
