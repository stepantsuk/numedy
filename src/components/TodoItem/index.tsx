import { Link, useNavigate } from 'react-router-dom'

import type { TTodoItem } from '../../slices/todos'
import { BUTTON_TYPE } from '../../ui/Button/config'
import {
  LEXICS,
  PAGES,
} from '../../config'
import { useModal } from '../../hooks/useModal'
import { useAppDispatch } from '../../store/hooks'
import { useTodoItem } from './hooks'
import {
  deleteTodo,
  setDoneFlag,
} from '../../slices/todos'
import { Button } from '../../ui/Button'
import { ConfirmPopup } from '../../ui/ConfirmPopup'
import css from './TodoItem.module.css'

export type TTodoItemFC = {
  todo: TTodoItem,
}

export const TodoItem = ({
  todo,
}: TTodoItemFC) => {
  const {
    changeTask,
    deleteTask,
  } = BUTTON_TYPE

  const {
    dateTitleEnd,
    dateTitleStart,
    descriptionTitle,
  } = LEXICS

  const navigate = useNavigate()

  const {
    description,
    dateEnd,
    dateStart,
    id,
    isDone,
    title,
  } = todo

  const {
    dateEndFormatted,
    dateStartFormatted,
  } = useTodoItem({
    dateEnd: new Date(dateEnd),
    dateStart: new Date(dateStart),
  })

  const dispatch = useAppDispatch()

  const handleDeleteTodo = () => dispatch(deleteTodo(id))
  const handleSetDone = () => dispatch(setDoneFlag(todo))

  const {
    close: closeEdit,
    isOpen: isOpenEdit,
    open: openEdit,
  } = useModal()

  const {
    close: closeDelete,
    isOpen: isOpenDelete,
    open: openDelete,
  } = useModal()

  const hadleConfirmEdit = () => {
    closeEdit()
    navigate(`${PAGES.edit}/${id}`)
  }

  const hadleConfirmDelete = () => {
    handleDeleteTodo()
    closeDelete()
  }


  return (
    <li className={css.todoItem}>
      {isOpenEdit && (
        <ConfirmPopup
          confirmLexic={LEXICS.askEdit}
          onCancel={closeEdit}
          onConfirm={hadleConfirmEdit}
        />
      )}
      {isOpenDelete && (
        <ConfirmPopup
          confirmLexic={LEXICS.askDelete}
          onCancel={closeDelete}
          onConfirm={hadleConfirmDelete}
        />
      )}
      <div className={css.todoRow}>
        <div className={css.todoTitle}>
          {title}
        </div>
        <input
          type='checkbox'
          className={css.todoCheckbox}
          checked={isDone}
          onChange={handleSetDone}
        />
      </div>
      <div className={css.todoRow}>
        <div className={css.todoDate}>
          <div className={css.dateTitle}>
            {dateTitleStart}
          </div>
          <div className={css.dateValue}>
            {dateStartFormatted}
          </div>
        </div>
        <div className={css.todoDate}>
          <div className={css.dateTitle}>
            {dateTitleEnd}
          </div>
          <div className={css.dateValue}>
            {dateEndFormatted}
          </div>
        </div>
      </div>
      <div className={css.todoColumn}>
        <div className={css.todoTitle}>
          {descriptionTitle}
        </div>
        <div className={css.todoDescription}>
          {description}
        </div>
      </div>
      <Link to={`${PAGES.edit}/${id}`}>
        <div className={css.buttonFrame}>
          <Button
            buttonType={changeTask}
            onClick={openEdit}
          />
        </div>
      </Link>
      {/* <div className={css.buttonFrame}> */}
      <div className={css.todoRow}>
        <Button
          buttonType={deleteTask}
          // onClick={handleDeleteTodo}
          onClick={openDelete}
        />
      </div>
    </li>
  )
}