import { User } from 'ingadi'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  user: User
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
}

export const clientInfo = ({ page, width, height, normalFont, user }: Props) => {
  const { name, address } = user
  if (!address || !name) return

  const { address1, streetAddress, cityOrDistrict, provinceOrState, postalCode, country } = address

  page.drawText(name, {
    x: width / 2 - 252,
    y: height / 2 + 89,
    size: 10,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(name, {
    x: width / 2 - 194,
    y: height / 2 + 78,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(streetAddress, {
    x: width / 2 - 252,
    y: height / 2 + 67,
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

  page.drawText(`${cityOrDistrict}, ${provinceOrState}, ${postalCode}`, {
    x: width / 2 - 252,
    y: height / 2 + 47,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  page.drawText(country, {
    x: width / 2 - 252,
    y: height / 2 + 37,
    size: 9,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
