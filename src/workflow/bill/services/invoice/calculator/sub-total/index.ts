import { teamTotalCalculator } from '@bill/services/invoice/calculator/sub-total/team-total'

interface Props {
  price: number
  guestsNumber: number
  baseGuestsNumber: number
}

export const subTotalCalculator = ({ price, guestsNumber, baseGuestsNumber }: Props) => {
  const teamTotal = teamTotalCalculator({ price, baseGuestsNumber, guestsNumber })

  return teamTotal
}
