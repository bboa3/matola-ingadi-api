import { Pricing } from 'bill'

interface CalculatorProps {
  pricing: Pricing
  eventType: string
  eventDate: string
  numberOfGuests: number
}

export const eventPriceCalculator = ({ pricing, eventType, eventDate, numberOfGuests }: CalculatorProps) => {
  const { price, id } = pricing
  const total = price * numberOfGuests

  return {
    numberOfGuests,
    eventType,
    eventDate,
    total,
    eventPricingId: id
  }
}
