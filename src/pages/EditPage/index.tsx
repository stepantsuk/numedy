import isUndefined from 'lodash/isUndefined'

import { todos } from '../../mocs/todos'
import { usePageId } from '../../hooks/usePageId'
import { Container } from '../../ui/Container'
import { TodoCreate } from '../../components/TodoCreate'


const EditPage = () => {
  const todoId = usePageId()
  console.log('todoId =>', todoId)

  return (
    <Container>
      <TodoCreate
        descriptionTodo={isUndefined(todoId) ? '' : todos[0].description}
        endDate={isUndefined(todoId) ? new Date() : todos[0].dateEnd}
        startDate={isUndefined(todoId) ? new Date() : todos[0].dateStart}
        titleTodo={isUndefined(todoId) ? '' : todos[0].title}
      />
    </Container>
  )
}

export default EditPage
