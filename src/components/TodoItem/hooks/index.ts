import { getFormattedDate } from '../helpers/getFormattedDate'

type TUseTodoItem = {
  dateEnd: Date,
  dateStart: Date,
}

export const useTodoItem = ({
  dateEnd,
  dateStart,
}: TUseTodoItem) => {
  const dateEndFormatted = getFormattedDate(dateEnd)
  const dateStartFormatted = getFormattedDate(dateStart)


  return {
    dateEndFormatted,
    dateStartFormatted,
  }
}