import { createDate } from '@utils/date'

export const getMonths = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      minMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      dateLocalizer: (date: string, months?: string[]) => {
        const inDayJs = createDate(date)
        return inDayJs.format('MMMM D, YYYY')
      }
    },
    {
      locale: 'pt',
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      minMonths: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      dateLocalizer: (date: string, months: string[]) => {
        const inDayJs = createDate(date)
        const year = inDayJs.year()
        const month = inDayJs.month()
        const day = inDayJs.date()
        return `${day} de ${months[month]} ${year}`
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}
