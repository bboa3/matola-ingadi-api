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
  const { name, address } = client
  if (!address) return

  const { address1, address2, city, province, postalCode, country } = address

  page.drawText(name, {
    x: width / 2 - 252,
    y: height / 2 + 77,
    size: 10,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(name, {
    x: width / 2 - 194,
    y: height / 2 + 66,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(address1, {
    x: width / 2 - 252,
    y: height / 2 + 55,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(address2, {
    x: width / 2 - 252,
    y: height / 2 + 45,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(`${city}, ${province}, ${postalCode}`, {
    x: width / 2 - 252,
    y: height / 2 + 35,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(country, {
    x: width / 2 - 252,
    y: height / 2 + 25,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
