import { Discount } from 'billing'

interface Props {
  totalByGuestsNumber: number
  discount: Discount
}

export const otherDiscountCalculator = ({ totalByGuestsNumber, discount }: Props) => {
  const { other } = discount

  if (!other) {
    return 0
  }

  const { percentage } = other

  return totalByGuestsNumber * percentage / 100
}
