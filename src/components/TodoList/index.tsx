import map from 'lodash/map'

// import { Container } from '../Container'
import type { TTodosState } from '../../slices/todos'
import { TodoItem } from '../TodoItem'

// import { todos } from '../../mocs/todos'

import css from './TodoList.module.css'

type TTodoList = {
  todos: TTodosState
}

export const TodoList = ({
  todos
}: TTodoList) => {
  return (
    <div className={css.todoList}>
      {map(
        todos,
        (todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        )
      )}
    </div>
  )
}