import formatNumber from 'format-number'

export const moneyFormatter = (value: number) => {
  const formatted = formatNumber({
    integerSeparator: ' ',
    decimal: ',',
    truncate: 2
  })(value)

  const parts = String(value).split('.').length

  if (parts > 1) return `${formatted}MT`

  return `${formatted},00MT`
}
