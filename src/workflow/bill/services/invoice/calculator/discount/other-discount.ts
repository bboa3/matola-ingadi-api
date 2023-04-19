import { Discount } from 'billing'

interface Props {
  subTotal: number
  discount: Discount
}

export const otherDiscountCalculator = ({ subTotal, discount }: Props) => {
  const { other } = discount

  if (!other) {
    return 0
  }

  const { percentage } = other

  return subTotal * percentage / 100
}
