import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const MainPage = lazy(() => import('../../pages/MainPage'))
const EditPage = lazy(() => import('../../pages/EditPage'))

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<MainPage />} />
    <Route path='/edit/:todoId?' element={<EditPage />} />
    {/* <Route path='/edit/:todoId/*' element={<EditPage />} /> */}
  </Routes>
)
