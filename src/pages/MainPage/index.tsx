import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'

import { BUTTON_TYPE } from '../../ui/Button/config'
import {
  PAGES,
  LEXICS,
} from '../../config'
import { useModal } from '../../hooks/useModal'
import { useAppSelector } from '../../store/hooks'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { Select } from '../../ui/Select'
import { TodoList } from '../../components/TodoList'
import { EndOfList } from '../../ui/EndOfList'
import { ConfirmPopup } from '../../ui/ConfirmPopup'

import css from './MainPage.module.css'

const MainPage = () => {
  const selectFn = (str: string) => console.log('selectFn =>', str)
  const todos = useAppSelector((state) => state.todos)

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

  const showoTodoList = !isEmpty(todos)

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
              onChange={selectFn} />
            <TodoList
              todos={todos} />
            <EndOfList />
          </Fragment>
        )}
        {/* <Pagination
          totalCount={96}
        /> */}
      </div>
    </Container>
  )
}

export default MainPage
