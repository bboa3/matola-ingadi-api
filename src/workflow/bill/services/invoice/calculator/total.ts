import { servicesTotalCalculator } from '@bill/services/invoice/calculator/services-total'
import { Pricing } from 'billing'

interface Props {
  pricing: Pricing
  guestsNumber: number
}

export const totalCalculator = ({ pricing, guestsNumber }: Props) => {
  const { price, baseGuestsNumber, discount } = pricing
  const { total: servicesTotal, totalDiscounted } = servicesTotalCalculator({ price, baseGuestsNumber, guestsNumber, discount })

  return {
    subTotal: servicesTotal,
    total: servicesTotal,
    discounted: totalDiscounted
  }
}
