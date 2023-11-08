import { todos } from '../../mocs/todos'
import { Container } from '../../ui/Container'
import { TodoCreate } from '../../components/TodoCreate'


export const EditPage = () => {
  return (
    <Container>
      <TodoCreate
        descriptionTodo={todos[0].description}
        endDate={todos[0].dateEnd}
        startDate={todos[0].dateStart}
        titleTodo={todos[0].title}
      />
    </Container>
  )
}