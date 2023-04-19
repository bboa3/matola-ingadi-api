import { discountCalculator } from '@bill/services/invoice/calculator/services-total/discount'
import { totalByGuestsNumberCalculator } from '@bill/services/invoice/calculator/services-total/guests-number-total'
import { Discount } from 'billing'

interface Props {
  price: number
  guestsNumber: number
  baseGuestsNumber: number
  discount: Discount
}

export const servicesTotalCalculator = ({ price, guestsNumber, baseGuestsNumber, discount }: Props) => {
  const totalByGuestsNumber = totalByGuestsNumberCalculator({ price, guestsNumber, baseGuestsNumber })

  const totalAfterDiscount = discountCalculator({ totalByGuestsNumber, discount })

  return totalAfterDiscount
}
