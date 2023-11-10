import {
  BaseSyntheticEvent,
  KeyboardEvent,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'

import size from 'lodash/size'
import isUndefined from 'lodash/isUndefined'

import { useAppDispatch } from '../../../store/hooks'
import {
  createNewTodo,
  changeTodo,
} from '../../../slices/todos'
import { KEYBOARD_KEYS } from '../../../config'
import { useModal } from '../../../hooks/useModal'

type TUseTodoCreate = {
  descriptionTodo: string,
  endDate: string,
  isDone: boolean,
  startDate: string,
  titleTodo: string,
  todoId?: number,
}

export const useTodoCreate = ({
  descriptionTodo,
  endDate,
  isDone,
  startDate,
  titleTodo,
  todoId,
}: TUseTodoCreate) => {
  const [todoTitle, setTodoTitle] = useState<string>(titleTodo)
  const [todoDescription, setTodoDescription] = useState<string>(descriptionTodo)
  const [todoStartDate, setTodoStartDate] = useState<string>(startDate)
  const [todoEndDate, setTodoEndDate] = useState<string>(endDate)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const isNewTodo = isUndefined(todoId)

  const onChangeStartDate = (e: BaseSyntheticEvent) => {
    setTodoStartDate(e.target.value)

    if (e.target.value > todoEndDate) {
      setTodoEndDate(e.target.value)
    }
  }

  const onChangeEndDate = (e: BaseSyntheticEvent) => {
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

    const ucFirst = (str: string) => {
      if (!str) return str;

      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }

    const formattedStr = ucFirst(removeAllEmptySpaces)

    if (formattedStr !== titleTodo) {
      setTodoTitle(formattedStr)
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

  const todoToSet = {
    description: todoDescription,
    dateEnd: todoEndDate,
    dateStart: todoStartDate,
    id: isNewTodo ? Date.now() : todoId,
    isDone,
    title: todoTitle,
  }
  const handleDispatch = isNewTodo
    ? () => dispatch(createNewTodo(todoToSet))
    : () => dispatch(changeTodo(todoToSet))

  const onConfirm = () => {
    handleDispatch()
    navigate('/')
  }

  return {
    closeConfirm,
    endDateTodo: todoEndDate,
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
    onConfirm,
    openConfirm,
    startDateTodo: todoStartDate,
    startEditingDescription,
    startEditingTitle,
    todoDescription,
    todoTitle,
  }
}