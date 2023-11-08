import { LEXICS } from '../../config'
import css from './EndOfList.module.css'

export const EndOfList = () => {
  const { endOfListLexic } = LEXICS

  return (
    <div className={css.endOfList}>
      {endOfListLexic}
    </div>
  )
}