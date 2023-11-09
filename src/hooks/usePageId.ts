import isUndefined from 'lodash/isUndefined'
import { useParams } from 'react-router-dom'

export const usePageId = () => {
  const { todoId } = useParams()

  if (!isUndefined(todoId)) return Number(todoId)

  return (todoId)
}