import { Fragment } from 'react'

import { BUTTON_TYPE } from '../../ui/Button/config'
import { LEXICS } from '../../config'
import { useMainPage } from './hooks'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { Select } from '../../ui/Select'
import { TodoList } from '../../components/TodoList'
import { EndOfList } from '../../ui/EndOfList'
import { ConfirmPopup } from '../../ui/ConfirmPopup'
import { Pagination } from '../../components/Pagination'

import css from './MainPage.module.css'

const MainPage = () => {
  const {
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
  } = useMainPage()
  
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
