import { ReactNode } from 'react'

import css from './Container.module.css'

type TContainer = {
  children?: ReactNode,
}

export const Container = ({
  children
}: TContainer) => {
  return (
    <div className={css.container} >
      {children}
    </div >
  )
}