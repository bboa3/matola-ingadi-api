import { Client } from 'ingadi'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  client: Client
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
}

export const clientInfo = ({ page, width, height, normalFont, client }: Props) => {
  const { name, address: { address1, address2, city, province, postalCode, country } } = client

  page.drawText(name, {
    x: width / 2 - 252,
    y: height / 2 + 80,
    size: 10,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(name, {
    x: width / 2 - 194,
    y: height / 2 + 70,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(address1, {
    x: width / 2 - 252,
    y: height / 2 + 57,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(address2, {
    x: width / 2 - 252,
    y: height / 2 + 47,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(`${city}, ${province}, ${postalCode}`, {
    x: width / 2 - 252,
    y: height / 2 + 37,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(country, {
    x: width / 2 - 252,
    y: height / 2 + 27,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
