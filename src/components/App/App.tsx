import { Suspense } from 'react'

import css from './App.module.css'
import { Footer } from '../../ui/Footer'
import { Loader } from '../../ui/Loader'
import { AppRoutes } from './AppRoutes'

export const App = () => (
  <div className={css.wrapper}>
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </div>
    <Footer />
  </div>
)
