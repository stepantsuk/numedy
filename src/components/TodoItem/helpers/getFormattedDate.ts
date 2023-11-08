import ruLocale from 'date-fns/locale/ru'
import format from 'date-fns/format'

import { DEFAULT_DATE_FORMAT } from '../../../config'

export const getFormattedDate = (date: Date) => {
  const dateString = format(date, DEFAULT_DATE_FORMAT, { locale: ruLocale }).replace('.', '')
  return `${dateString} г.`
}