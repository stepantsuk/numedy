import map from 'lodash/map'

// import { Container } from '../Container'
import { TodoItem } from '../TodoItem'

import { todos } from '../../mocs/todos'

import css from './TodoList.module.css'

export const TodoList = () => {
  return (
    <div className={css.todoList}>
      {map(
        todos,
        ({
          dateEnd,
          dateStart,
          description,
          title,
        }, index) => (
          <TodoItem
            dateEnd={dateEnd}
            dateStart={dateStart}
            description={description}
            title={title}
            key={index}
          />
        )
      )}
    </div>
  )
}