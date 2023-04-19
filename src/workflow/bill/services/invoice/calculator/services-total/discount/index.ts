import { otherDiscountCalculator } from '@bill/services/invoice/calculator/services-total/discount/other-discount'
import { Discount } from 'billing'

interface Props {
  totalByGuestsNumber: number
  discount: Discount
}

export const discountCalculator = ({ totalByGuestsNumber, discount }: Props) => {
  const otherDiscount = otherDiscountCalculator({ totalByGuestsNumber, discount })

  const totalDiscounted = otherDiscount
  const total = totalByGuestsNumber - totalDiscounted

  return {
    totalDiscounted,
    total
  }
}
