import css from './App.module.css'
import { MainPage } from '../../pages/MainPage'
import { EditPage } from '../../pages/EditPage'
import { Footer } from '../../ui/Footer'

export const App = () => (
  <div className={css.wrapper}>
    <MainPage />
    <EditPage />
    <Footer />
  </div>
)
