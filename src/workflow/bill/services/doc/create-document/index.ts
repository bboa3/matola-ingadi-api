import { clientInfo } from '@bill/services/doc/create-document/client'
import { identifier } from '@bill/services/doc/create-document/identifier'
import { payedMark } from '@bill/services/doc/create-document/payed-mark'
import { servicesInfo } from '@bill/services/doc/create-document/services'
import { sign } from '@bill/services/doc/create-document/sign'
import { transactionsInfo } from '@bill/services/doc/create-document/transactions'
import { Invoice, Pricing } from 'bill'
import dayjs from 'dayjs'
import fs from 'fs/promises'
import { User } from 'ingadi'
import { resolve } from 'path'
import { PDFDocument, StandardFonts } from 'pdf-lib'

interface CreateDocumentProps {
  invoice: Invoice
  user: User
  eventPricing: Pricing
}

const templetePath = resolve(__dirname, '..', 'templete', 'invoice-for-payment.pdf')

export const createInvoiceDocument = async ({ invoice, user, eventPricing }: CreateDocumentProps) => {
  const { code } = invoice.invoiceId
  const now = dayjs(new Date()).unix()

  const invoiceName = `${code}-${now}.pdf`

  const path = resolve(__dirname, '..', '..', '..', '..', '..', 'view', 'invoice', invoiceName)

  const file = await fs.readFile(templetePath)

  const doc = await PDFDocument.load(file)
  const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold)
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica)

  const pages = doc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()

  payedMark({
    invoice,
    page: firstPage,
    width: width,
    height: height,
    boldFont: helveticaBoldFont
  })

  identifier({
    invoice,
    page: firstPage,
    width: width,
    height: height,
    boldFont: helveticaBoldFont,
    normalFont: helveticaFont
  })

  clientInfo({
    user,
    page: firstPage,
    width: width,
    height: height,
    normalFont: helveticaFont
  })

  servicesInfo({
    invoice,
    eventPricing,
    page: firstPage,
    width: width,
    height: height,
    normalFont: helveticaFont,
    boldFont: helveticaBoldFont
  })

  transactionsInfo({
    invoice,
    page: firstPage,
    width: width,
    height: height,
    boldFont: helveticaBoldFont,
    normalFont: helveticaFont
  })

  sign({
    page: firstPage,
    width: width,
    height: height,
    normalFont: helveticaFont
  })

  const pdfBytes = await doc.save()

  await fs.writeFile(path, pdfBytes)

  return invoiceName
}
