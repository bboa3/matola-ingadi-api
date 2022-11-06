import { Pricing } from 'bill'

interface CalculatorProps {
  pricing: Pricing
  eventType: string
  eventDate: string
  guestsNumber: number
}

export const eventPriceCalculator = ({ pricing, eventType, eventDate, guestsNumber }: CalculatorProps) => {
  const { price, id } = pricing
  const total = price * guestsNumber

  return {
    guestsNumber,
    eventType,
    eventDate,
    total,
    eventPricingId: id
  }
}
