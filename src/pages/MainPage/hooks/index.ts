import {
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import size from 'lodash/size'
import slice from 'lodash/slice'

import {
  DEFAULT_ACTIVE_PAGE,
  MAX_ITEMS,
  PAGES,
} from '../../../config'
import { useModal } from '../../../hooks/useModal'
import { useAppSelector } from '../../../store/hooks'

export const useMainPage = () => {
  const [sortValue, setSortValue] = useState('')
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE)

  const todos = useAppSelector((state) => state.todos)

  const sortedTodos = useMemo(() => {
    if (sortValue) {
      return sortBy(todos, [sortValue])
    }

    // айди получаем при добавблении нового таска через Date.now(),
    // соответственно, сортировка будет по умолчанию от по сроку добавления
    return sortBy(todos, ({ id }) => id)
  }, [sortValue, todos])

  const leftBorderToSlice = (activePage - 1) * MAX_ITEMS
  const rightBorderToSlice = activePage * MAX_ITEMS

  const slicedTodos = slice(sortedTodos, leftBorderToSlice, rightBorderToSlice)

  const {
    close,
    isOpen,
    open,
  } = useModal()

  const navigate = useNavigate()

  const handleAddTask = () => {
    close()
    navigate(`/${PAGES.edit}`)
  }

  const showoTodoList = !isEmpty(sortedTodos)

  const todosCount = size(sortedTodos)

  useEffect(() => {
    setActivePage(DEFAULT_ACTIVE_PAGE)
  }, [sortValue])

  return {
    activePage,
    close,
    handleAddTask,
    isOpen,
    open,
    setActivePage,
    setSortValue,
    showoTodoList,
    slicedTodos,
    sortValue,
    todosCount,
  }
}