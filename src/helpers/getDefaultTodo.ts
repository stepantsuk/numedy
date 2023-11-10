import format from 'date-fns/format'

import type { TTodoItem } from '../slices/todos'

export const getDefaultTodo = (): TTodoItem => {
  return {
    description: '',
    dateEnd: format(new Date(), 'yyyy-MM-dd'),
    dateStart: format(new Date(), 'yyyy-MM-dd'),
    id: Date.now(),
    isDone: false,
    title: '',
  }
}