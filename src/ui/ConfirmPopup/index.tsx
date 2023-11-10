import { BUTTON_TYPE } from '../Button/config'
import { Button } from '../Button'
import css from './ConfirmPopup.module.css'

export type TConfirmPopup = {
  confirmLexic: string,
  onConfirm?: () => void,
  onCancel?: () => void,
}

export const ConfirmPopup = ({
  confirmLexic,
  onConfirm,
  onCancel,
}: TConfirmPopup) => {
  const {
    confirmYes,
    confrimNo,
  } = BUTTON_TYPE

  return (
    <div className={css.popupOverlay}>
      <div className={css.popupBlock}>
        <div className={css.popupTitle}>
          {confirmLexic}
        </div>
        <div className={css.confirmButtons}>
          <Button
            buttonType={confirmYes}
            onClick={onConfirm}
          />
          <Button
            buttonType={confrimNo}
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  )
}