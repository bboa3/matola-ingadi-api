import { ViewBill } from 'bill'
import fs from 'fs/promises'
import { resolve } from 'path'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { payedMark } from './payed-mark'

interface CreateDocumentProps {
  bill: ViewBill
}

const path = resolve(__dirname, '..', 'bill-for-payment.pdf')

export const createDocument = async ({ bill }: CreateDocumentProps) => {
  const file = await fs.readFile(path)

  const doc = await PDFDocument.load(file)
  const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold)

  const pages = doc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()

  payedMark({
    page: firstPage,
    isPayed: false,
    width: width,
    height: height,
    font: helveticaBoldFont
  })

  const pdfBytes = await doc.save()

  await fs.writeFile('file.pdf', pdfBytes)

  return pdfBytes
}
