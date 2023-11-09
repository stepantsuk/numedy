import { Link } from 'react-router-dom'

import { BUTTON_TYPE } from '../../ui/Button/config'
import { PAGES } from '../../config'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { Select } from '../../ui/Select'
import { TodoList } from '../../components/TodoList'
import { EndOfList } from '../../ui/EndOfList'
import { Pagination } from '../../components/Pagination'

import css from './MainPage.module.css'

const MainPage = () => {
  const selectFn = (str: string) => console.log('selectFn =>', str)

  return (
    <Container>
      <div className={css.containerColumn}>
        <Link to={`${PAGES.edit}`}>
          <Button buttonType={BUTTON_TYPE.addTask}
          />
        </Link>
        <Select onChange={selectFn} />
        <TodoList />
        <EndOfList />
        <Pagination
          totalCount={96}
        />
      </div>
    </Container>
  )
}

export default MainPage
