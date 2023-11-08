import { LEXICS } from '../../config'
import css from './Footer.module.css'

export const Footer = () => {
  const { footerLexic } = LEXICS

  return (
    <div className={css.footer}>
      {footerLexic}
    </div>
  )
}