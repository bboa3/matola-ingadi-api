import { Bill } from 'billing'
import { PDFFont, PDFPage, rgb } from 'pdf-lib'

interface Props {
  bill: Bill
  page: PDFPage,
  width: number
  height: number
  normalFont: PDFFont
  boldFont: PDFFont
}

export const clientInfo = ({ page, width, height, normalFont, boldFont, bill }: Props) => {
  const { name, address, email, phoneNumber } = bill
  if (!address || !name) return

  const { cityOrDistrict, provinceOrState, country } = address

  const boxWidth = 134
  const boxX = width - 197
  const boxY = height / 2

  const nameUpperCase = name.toUpperCase()
  const nameWidth = boldFont.widthOfTextAtSize(nameUpperCase, 10)
  page.drawText(nameUpperCase, {
    x: boxX + boxWidth - nameWidth,
    y: boxY + 243,
    size: 10,
    font: boldFont,
    color: rgb(0, 0, 0)
  })

  const cityAddressUpperCase = `${cityOrDistrict}, ${provinceOrState},`.toUpperCase()
  const cityAddressWidth = boldFont.widthOfTextAtSize(cityAddressUpperCase, 8)
  page.drawText(cityAddressUpperCase, {
    x: boxX + boxWidth - cityAddressWidth,
    y: boxY + 230,
    size: 8,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const countryUpperCase = country.toUpperCase()
  const countryWidth = boldFont.widthOfTextAtSize(countryUpperCase, 8)
  page.drawText(countryUpperCase, {
    x: boxX + boxWidth - countryWidth,
    y: boxY + 219,
    size: 8,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const emailUpperCase = email.toUpperCase()
  const emailWidth = boldFont.widthOfTextAtSize(emailUpperCase, 8)
  page.drawText(emailUpperCase, {
    x: boxX + boxWidth - emailWidth,
    y: boxY + 209,
    size: 8,
    font: normalFont,
    color: rgb(0, 0, 0)
  })

  const phoneNumberUpperCase = phoneNumber.toUpperCase()
  const phoneNumberWidth = boldFont.widthOfTextAtSize(phoneNumberUpperCase, 8)
  page.drawText(phoneNumberUpperCase, {
    x: boxX + boxWidth - phoneNumberWidth,
    y: boxY + 198,
    size: 8,
    font: normalFont,
    color: rgb(0, 0, 0)
  })
}
