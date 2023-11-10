import { Link } from 'react-router-dom'

import find from 'lodash/find'

import type { TTodoItem } from '../../slices/todos'
import { useAppSelector } from '../../store/hooks'
import { getDefaultTodo } from '../../helpers/getDefaultTodo'
import { usePageId } from '../../hooks/usePageId'
import { LEXICS } from '../../config'
import { BUTTON_TYPE } from '../../ui/Button/config'
import { useTodoCreate } from './hooks'
import { Button } from '../../ui/Button'
import { ConfirmPopup } from '../../ui/ConfirmPopup'
import css from './TodoCreate.module.css'

export const TodoCreate = () => {
  const {
    askSave,
    enterDescription,
    enterEnd,
    enterStart,
    enterTitle
  } = LEXICS

  const {
    backToMain,
    saveTask,
  } = BUTTON_TYPE

  const todoId = usePageId()

  const todos = useAppSelector((state) => state.todos)

  const todo: TTodoItem = find(todos, ({ id }) => id === todoId) ?? getDefaultTodo()

  const {
    dateEnd,
    dateStart,
    description,
    isDone,
    title,
  } = todo

  const {
    closeConfirm,
    endDateTodo,
    finishEditingDescription,
    finishEditingTitle,
    isButtonDisabled,
    isEditingDescription,
    isEditingTitle,
    isOpenConfirm,
    keyDownDescription,
    keyDownTitle,
    onChangeDescription,
    onChangeEndDate,
    onChangeStartDate,
    onChangeTitle,
    onConfirm,
    openConfirm,
    startDateTodo,
    startEditingDescription,
    startEditingTitle,
    todoDescription,
    todoTitle,
  } = useTodoCreate({
    descriptionTodo: description,
    endDate: dateEnd,
    isDone,
    startDate: dateStart,
    titleTodo: title,
    todoId,
  })

  return (
    <div className={css.todoItem}>
      {isOpenConfirm && (
        <ConfirmPopup
          confirmLexic={askSave}
          onCancel={closeConfirm}
          onConfirm={onConfirm}
        />
      )}
      <div className={css.todoColumn}>
        <div className={css.todoTitle}>
          {enterTitle}
        </div>
        {
          isEditingTitle
            ? (
              <input
                autoFocus={isEditingTitle}
                className={css.todoInput}
                onBlur={finishEditingTitle}
                onChange={onChangeTitle}
                onKeyDown={keyDownTitle}
                value={todoTitle}
              />
            )
            : (
              <div
                className={css.todoInput}
                onClick={startEditingTitle}
              >
                {todoTitle}
              </div>
            )
        }
      </div>
      <div className={css.todoRow}>
        <div className={css.todoTitle}>
          {enterStart}
        </div>
        <input
          type='date'
          onChange={onChangeStartDate}
          value={startDateTodo}
        />
      </div>
      <div className={css.todoRow}>
        <div className={css.todoTitle}>
          {enterEnd}
        </div>
        <input
          type='date'
          onChange={onChangeEndDate}
          value={endDateTodo}
          min={startDateTodo}
        />
      </div>
      <div className={css.todoColumn}>
        <div className={css.todoTitle}>
          {enterDescription}
        </div>
        {
          isEditingDescription
            ? (
              <textarea
                autoFocus={isEditingDescription}
                className={`${css.todoInput} ${css.todoInputDescription}`}
                onBlur={finishEditingDescription}
                onChange={onChangeDescription}
                onKeyDown={keyDownDescription}
                value={todoDescription}
              />
            )
            : (
              <div
                className={`${css.todoInput} ${css.todoInputDescription}`}
                onClick={startEditingDescription}
              >
                {todoDescription}
              </div>
            )
        }
      </div>
      <div className={css.todoColumn}>
        <Button
          buttonType={saveTask}
          onClick={openConfirm}
          disabled={isButtonDisabled}
        />
      </div>
      <div className={css.todoColumn}>
        <Link to={'/'}>
          <Button
            buttonType={backToMain}
          />
        </Link>
      </div>
    </div>
  )
}