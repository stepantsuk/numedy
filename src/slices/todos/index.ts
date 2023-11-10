import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import findIndex from 'lodash/findIndex'
import filter from 'lodash/filter'
import isNull from 'lodash/isNull'

export type TTodoItem = {
  description: string,
  dateEnd: string,
  dateStart: string,
  id: number,
  isDone: boolean,
  title: string,
}

export type TTodosState = Array<TTodoItem>

const test = localStorage.getItem('todos')

const isStrNull = isNull(test)

const todosFromLocalStorage: TTodosState = isStrNull ? [] : JSON.parse(test)

const initialState = todosFromLocalStorage

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeTodo: (state, action: PayloadAction<TTodoItem>) => {
      const { id: todoId } = action.payload

      const indexTodo = findIndex(state, ({ id }) => id === todoId)

      state[indexTodo] = {
        ...action.payload,
      }

      localStorage.setItem('todos', JSON.stringify(state))
    },
    createNewTodo: (state, action: PayloadAction<TTodoItem>) => {
      state.push(action.payload)

      localStorage.setItem('todos', JSON.stringify(state))
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todoId = action.payload

      state = filter(state, ({ id }) => id !== todoId)

      localStorage.setItem('todos', JSON.stringify(state))

      return state
    },
    setNewTodos: (state, action: PayloadAction<Array<TTodoItem>>) => {
      state = action.payload

      localStorage.setItem('todos', JSON.stringify(state))

      return state
    },
  },
})

export const { changeTodo, createNewTodo, deleteTodo, setNewTodos } = todosSlice.actions

export default todosSlice.reducer