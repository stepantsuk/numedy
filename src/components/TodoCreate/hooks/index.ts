import {
  BaseSyntheticEvent,
  KeyboardEvent,
  useState,
} from 'react'

import format from 'date-fns/format'

import size from 'lodash/size'

import { KEYBOARD_KEYS } from '../../../config'
import { useModal } from '../../../hooks/useModal'

type TUseTodoCreate = {
  endDate: Date,
  descriptionTodo: string,
  startDate: Date,
  titleTodo: string,
}

export const useTodoCreate = ({
  endDate,
  descriptionTodo,
  startDate,
  titleTodo,
}: TUseTodoCreate) => {
  const [todoTitle, setTodoTitle] = useState<string>(titleTodo)
  const [todoDescription, setTodoDescription] = useState<string>(descriptionTodo)
  const [todoStartDate, setTodoStartDate] = useState<string>(format(startDate, 'yyyy-MM-dd'))
  const [todoEndDate, setTodoEndDate] = useState<string>(format(endDate, 'yyyy-MM-dd'))


  const onChangeStartDate = (e: BaseSyntheticEvent) => {
    // console.log('todoStartDate =>', e.target.value)
    setTodoStartDate(e.target.value)
  }

  const onChangeEndDate = (e: BaseSyntheticEvent) => {
    // const myDate = new Date()
    // const formateDate = format(myDate, 'yyyy-MM-dd')
    // console.log('formateDate =>', formateDate)
    // console.log('e.target.value =>', e.target.value)
    // console.log('new Date(todoStartDate) =>', new Date(formateDate))
    // console.log('new Date(e.target.value) =>', new Date(e.target.value))

    // console.log(new Date(e.target.value) < new Date(formateDate))
    setTodoEndDate(e.target.value)
  }

  const isButtonDisabled = size(todoTitle) === 0

  const {
    close: endEditingTitle,
    isOpen: isEditingTitle,
    open: startEditingTitle,
  } = useModal()

  const {
    close: endEditingDescription,
    isOpen: isEditingDescription,
    open: startEditingDescription,
  } = useModal()

  const {
    close: closeConfirm,
    isOpen: isOpenConfirm,
    open: openConfirm,
  } = useModal()

  const onChangeTitle = (e: BaseSyntheticEvent) => {
    setTodoTitle(e.target.value)
  }

  const onChangeDescription = (e: BaseSyntheticEvent) => {
    setTodoDescription(e.target.value)
  }

  const finishEditingTitle = () => {
    const removeAllEmptySpaces = (todoTitle.trim().replace(/[ ]{2,}/g, ' '))

    if (removeAllEmptySpaces !== titleTodo) {
      // setTitle(todoTitle)
      setTodoTitle(todoTitle)
    } else {
      setTodoTitle(titleTodo)
    }

    endEditingTitle()
  }

  const keyDownTitle = (e: KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.enter) {
      finishEditingTitle()
    } else if (e.key === KEYBOARD_KEYS.escape) {
      setTodoTitle(titleTodo)
      endEditingTitle()
    }
  }

  const finishEditingDescription = () => {
    const removeAllEmptySpaces = (todoDescription.trim().replace(/[ ]{2,}/g, ' '))

    if (removeAllEmptySpaces !== descriptionTodo) {
      // setTitle(todoTitle)
      setTodoDescription(todoDescription)
    } else {
      setTodoDescription(descriptionTodo)
    }

    endEditingDescription()
  }

  const keyDownDescription = (e: KeyboardEvent) => {
    if (e.key === KEYBOARD_KEYS.escape) {
      setTodoDescription(descriptionTodo)
      endEditingDescription()
    }
  }

  return {
    closeConfirm,
    finishEditingDescription,
    finishEditingTitle,
    isButtonDisabled,
    isEditingDescription,
    isEditingTitle,
    isOpenConfirm,
    keyDownDescription,
    keyDownTitle,
    onChangeDescription,
    onChangeEndDate,
    onChangeStartDate,
    onChangeTitle,
    openConfirm,
    startEditingDescription,
    startEditingTitle,
    todoDescription,
    todoEndDate,
    todoStartDate,
    todoTitle,
  }
}