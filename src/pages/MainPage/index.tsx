import {
  Fragment,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import size from 'lodash/size'
import slice from 'lodash/slice'

import { BUTTON_TYPE } from '../../ui/Button/config'
import {
  DEFAULT_ACTIVE_PAGE,
  LEXICS,
  MAX_ITEMS,
  PAGES,
} from '../../config'
import { useModal } from '../../hooks/useModal'
import { useAppSelector } from '../../store/hooks'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { Select } from '../../ui/Select'
import { TodoList } from '../../components/TodoList'
import { EndOfList } from '../../ui/EndOfList'
import { ConfirmPopup } from '../../ui/ConfirmPopup'
import { Pagination } from '../../components/Pagination'

import css from './MainPage.module.css'

const MainPage = () => {
  const [sortValue, setSortValue] = useState('')
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE)

  // const selectFn = (str: string) => console.log('selectFn =>', str)
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

  return (
    <Container>
      <div className={css.containerColumn}>
        {isOpen && (
          <ConfirmPopup
            confirmLexic={LEXICS.askAdd}
            onCancel={close}
            onConfirm={handleAddTask}
          />
        )}
        <Button
          buttonType={BUTTON_TYPE.addTask}
          onClick={open}
        />
        {!showoTodoList && (
          <div className={css.emptyTask}>
            {LEXICS.noTasks}
          </div>
        )}
        {showoTodoList && (
          <Fragment>
            <Select
              onChange={setSortValue}
              sortValue={sortValue}
            />
            <TodoList
              todos={slicedTodos} />
            <EndOfList />
          </Fragment>
        )}
        <Pagination
          totalCount={todosCount}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </Container>
  )
}

export default MainPage
