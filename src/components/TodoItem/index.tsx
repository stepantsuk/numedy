import { Link } from 'react-router-dom'

import { BUTTON_TYPE } from '../../ui/Button/config'
import {
  LEXICS,
  PAGES,
} from '../../config'
import { useTodoItem } from './hooks'
import { Button } from '../../ui/Button'
import css from './TodoItem.module.css'

export type TTodoItem = {
  id: number,
  description: string,
  dateEnd: Date,
  dateStart: Date,
  title: string;
}

export const TodoItem = ({
  id,
  description,
  dateEnd,
  dateStart,
  title,
}: TTodoItem) => {
  const {
    changeTask,
    deleteTask,
  } = BUTTON_TYPE

  const {
    dateTitleEnd,
    dateTitleStart,
    descriptionTitle,
  } = LEXICS

  const {
    dateEndFormatted,
    dateStartFormatted,
  } = useTodoItem({
    dateEnd,
    dateStart,
  })

  return (
    <li className={css.todoItem}>
      <div className={css.todoRow}>
        <div className={css.todoTitle}>
          {title}
        </div>
        <input
          type='checkbox'
          className={css.todoCheckbox}
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
            onClick={() => console.log(`${changeTask}`)}
          />
        </div>
      </Link>
      {/* <div className={css.buttonFrame}> */}
      <div className={css.todoRow}>
        <Button
          buttonType={deleteTask}
          onClick={() => console.log(`${deleteTask}`)}
        />
      </div>
    </li>
  )
}