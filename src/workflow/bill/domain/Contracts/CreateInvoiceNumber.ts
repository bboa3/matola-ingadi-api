import { InvoiceIdEntity } from 'bill'

export type CreateInvoiceNumberDB = () => Promise<InvoiceIdEntity>
