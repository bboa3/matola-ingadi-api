import { clientInfo } from '@mail/services/doc/create-invoice/client'
import { identifier } from '@mail/services/doc/create-invoice/identifier'
import { payedMark } from '@mail/services/doc/create-invoice/payed-mark'
import { servicesInfo } from '@mail/services/doc/create-invoice/services'
import fontkit from '@pdf-lib/fontkit'
import { Bill, Invoice, Transaction } from 'billing'
import fs from 'fs'
import { join, resolve } from 'path'
import { PDFDocument } from 'pdf-lib'

interface CreateDocumentProps {
  transaction: Transaction
  invoice: Invoice
  bill: Bill
}

const templete = fs.readFileSync(resolve(__dirname, '..', 'templete', 'invoice.pdf'))
const regularFont = fs.readFileSync(resolve(__dirname, '..', 'templete', 'Montserrat-Regular.otf'))
const boldFont = fs.readFileSync(resolve(__dirname, '..', 'templete', 'Montserrat-Bold.otf'))

const dirPath = resolve(__dirname, '..', '..', '..', '..', '..', 'view', 'invoices')
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true })
}

export const createInvoiceDocument = async ({ invoice, bill, transaction }: CreateDocumentProps) => {
  const { invoiceCode } = invoice

  const invoicePath = join(dirPath, `${invoiceCode}-${transaction.id}.pdf`)

  const doc = await PDFDocument.load(templete)
  doc.registerFontkit(fontkit)

  const montserratSemiBoldFont = await doc.embedFont(boldFont)
  const montserratFont = await doc.embedFont(regularFont)

  const pages = doc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()

  payedMark({
    transaction,
    page: firstPage,
    width: width,
    height: height,
    boldFont: montserratSemiBoldFont
  })

  identifier({
    invoice,
    page: firstPage,
    width: width,
    height: height,
    boldFont: montserratSemiBoldFont
  })

  clientInfo({
    bill,
    page: firstPage,
    width: width,
    height: height,
    normalFont: montserratFont,
    boldFont: montserratSemiBoldFont
  })

  servicesInfo({
    transaction,
    invoice,
    page: firstPage,
    width: width,
    height: height,
    normalFont: montserratFont,
    boldFont: montserratSemiBoldFont
  })

  const pdfBytes = await doc.save()

  fs.writeFileSync(invoicePath, pdfBytes)

  return invoicePath
}
