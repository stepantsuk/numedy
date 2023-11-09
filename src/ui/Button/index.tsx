import { useButton } from './hooks'
import css from './Button.module.css'

type TButton = {
  buttonType: string,
  disabled?: boolean,
  onClick?: () => void,
}

export const Button = ({
  buttonType,
  disabled,
  onClick,
}: TButton) => {
  const {
    buttonClass,
    lexic,
  } = useButton({
    buttonType,
    disabled,
  })

  return (
    <div className={css.buttonContainer}>
      <button
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {lexic}
      </button>
    </div>
  )
}