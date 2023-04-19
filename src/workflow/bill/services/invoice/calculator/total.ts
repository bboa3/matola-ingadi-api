import { discountCalculator } from '@bill/services/invoice/calculator/discount'
import { subTotalCalculator } from '@bill/services/invoice/calculator/sub-total'
import { Pricing } from 'billing'

interface Props {
  pricing: Pricing
  guestsNumber: number
  paymentGatewayFee: number
}

export const totalCalculator = ({ pricing, guestsNumber, paymentGatewayFee }: Props) => {
  const { price, baseGuestsNumber, discount } = pricing

  const subTotal = subTotalCalculator({ price, baseGuestsNumber, guestsNumber })

  const discounted = discountCalculator({ subTotal, discount })

  const total = (subTotal - discounted) + paymentGatewayFee

  return {
    subTotal,
    total,
    discounted
  }
}
