import { LEXICS } from '../../config'
import { BUTTON_TYPE } from '../../ui/Button/config'
import { useTodoCreate } from './hooks'
import { Button } from '../../ui/Button'
import { ConfirmPopup } from '../../ui/ConfirmPopup'
import css from './TodoCreate.module.css'

export type TTodoCreate = {
  endDate: Date,
  descriptionTodo: string,
  startDate: Date,
  titleTodo: string,
}

export const TodoCreate = ({
  descriptionTodo,
  endDate,
  startDate,
  titleTodo,
}: TTodoCreate) => {
  const {
    enterDescription,
    enterEnd,
    enterStart,
    enterTitle
  } = LEXICS

  const {
    saveTask,
  } = BUTTON_TYPE

  const {
    closeConfirm,
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
    openConfirm,
    startEditingDescription,
    startEditingTitle,
    todoDescription,
    todoEndDate,
    todoStartDate,
    todoTitle,
  } = useTodoCreate({
    descriptionTodo,
    endDate,
    startDate,
    titleTodo,
  })

  return (
    <div className={css.todoItem}>
      {isOpenConfirm && (
        <ConfirmPopup
          onCancel={closeConfirm}
          onConfirm={closeConfirm}
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
          value={todoStartDate}
        />
      </div>
      <div className={css.todoRow}>
        <div className={css.todoTitle}>
          {enterEnd}
        </div>
        <input
          type='date'
          onChange={onChangeEndDate}
          value={todoEndDate}
          min={todoStartDate}
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
    </div>
  )
}