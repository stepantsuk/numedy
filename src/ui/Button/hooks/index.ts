import cn from 'classnames/bind'

import includes from 'lodash/includes'

import { BUTTON_TYPE } from '../config'
import css from '../Button.module.css'

type TUseButton = {
  buttonType: string,
  disabled?: boolean,
}

export const useButton = ({
  buttonType,
  disabled,
}: TUseButton) => {
  const {
    addTask,
    changeTask,
    confirmYes,
    confrimNo,
    deleteTask,
    saveTask,
  } = BUTTON_TYPE

  let cx = cn.bind(css)

  const buttonClass = cx({
    button: true,
    buttonDisabled: disabled,
    buttonYes: buttonType === confirmYes,
    buttonNo: includes([confrimNo, deleteTask], buttonType),
  })

  const getLexic = () => {
    switch (buttonType) {
      case addTask:
        return 'Добавить новую задачу'
      case confirmYes:
        return 'Да'
      case confrimNo:
        return 'Нет'
      case changeTask:
        return 'Редактировать'
      case deleteTask:
        return 'Удалить'
      case saveTask:
        return 'Сохранить'
      default:
        return ''
    }
  }

  return {
    buttonClass,
    lexic: getLexic(),
  }
}