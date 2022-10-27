import { clientInfo } from '@bill/services/doc/create-document/client'
import { identifier } from '@bill/services/doc/create-document/identifier'
import { payedMark } from '@bill/services/doc/create-document/payed-mark'
import { servicesInfo } from '@bill/services/doc/create-document/services'
import { Pricing, ViewBill } from 'bill'
import fs from 'fs/promises'
import { Client } from 'ingadi'
import { resolve } from 'path'
import { PDFDocument, StandardFonts } from 'pdf-lib'

interface CreateDocumentProps {
  bill: ViewBill
  client: Client
  eventPricing: Pricing
}

const path = resolve(__dirname, '..', 'bill-for-payment.pdf')

export const createDocument = async ({ bill, client, eventPricing }: CreateDocumentProps) => {
  const file = await fs.readFile(path)

  const doc = await PDFDocument.load(file)
  const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold)
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica)

  const pages = doc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()

  payedMark({
    page: firstPage,
    isPayed: true,
    width: width,
    height: height,
    boldFont: helveticaBoldFont
  })

  identifier({
    bill,
    page: firstPage,
    width: width,
    height: height,
    boldFont: helveticaBoldFont,
    normalFont: helveticaFont
  })

  clientInfo({
    client,
    page: firstPage,
    width: width,
    height: height,
    normalFont: helveticaFont
  })

  servicesInfo({
    bill,
    eventPricing,
    page: firstPage,
    width: width,
    height: height,
    normalFont: helveticaFont
  })

  const pdfBytes = await doc.save()

  await fs.writeFile('file.pdf', pdfBytes)

  return pdfBytes
}
