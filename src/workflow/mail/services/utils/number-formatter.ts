import formatNumber from 'format-number'

export const moneyFormatter = (value: number, moneySign?: string) => {
  const sign = moneySign || 'MZN'

  const formatted = formatNumber({
    integerSeparator: '.',
    decimal: ',',
    truncate: 2
  })(value)

  const parts = String(value).split('.').length

  if (parts > 1) return `${formatted} ${sign}`

  return `${formatted},00 ${sign}`
}

export const numberFormatter = formatNumber({ integerSeparator: '.', decimal: ',' })
