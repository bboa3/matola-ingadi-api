interface Props {
  price: number
  guestsNumber: number
  baseGuestsNumber: number
}

export const teamTotalCalculator = ({ baseGuestsNumber, guestsNumber, price }: Props) => {
  const increasedLimit = guestsNumber - baseGuestsNumber

  if (increasedLimit <= 0) {
    return price
  }

  return price * (increasedLimit + 1)
}
