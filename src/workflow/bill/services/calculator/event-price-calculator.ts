import { Pricing } from 'bill'

interface CalculatorProps {
  pricing: Pricing
  eventType: string
  numberOfGuests: number
}

export const eventPriceCalculator = ({ pricing, eventType, numberOfGuests }: CalculatorProps) => {
  const { price, id } = pricing
  const total = price * numberOfGuests

  return {
    numberOfGuests,
    eventType,
    total,
    eventPricingId: id
  }
}
