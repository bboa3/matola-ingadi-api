import { otherDiscountCalculator } from '@bill/services/invoice/calculator/discount/other-discount'
import { Discount } from 'billing'

interface Props {
  subTotal: number
  discount: Discount
}

export const discountCalculator = ({ subTotal, discount }: Props) => {
  const otherDiscount = otherDiscountCalculator({ subTotal, discount })

  return otherDiscount
}
