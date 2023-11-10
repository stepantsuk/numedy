import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import findIndex from 'lodash/findIndex'
import filter from 'lodash/filter'

import type { RootState } from '../../store'

export type TTodoItem = {
  description: string,
  dateEnd: string,
  dateStart: string,
  id: number,
  isDone: boolean,
  title: string,
}

export type TTodosState = Array<TTodoItem>

// const initialState: TTodosState = [
//   {
//     id: 123,
//     description: 'test1 123',
//     dateEnd: '2023-11-09',
//     dateStart: '2023-11-09',
//     title: 'test1 123',
//   },
//   {
//     id: 456,
//     description: 'test2 456',
//     dateEnd: '2023-11-09',
//     dateStart: '2023-11-09',
//     title: 'test2 456',
//   },
//   {
//     id: 789,
//     description: 'Lorem ipsum dolor 789',
//     dateEnd: '2023-11-09',
//     dateStart: '2023-11-09',
//     title: '789',
//   }
// ]
const initialState: TTodosState = []

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeTodo: (state, action: PayloadAction<TTodoItem>) => {
      const { id: todoId } = action.payload

      const indexTodo = findIndex(state, ({ id }) => id === todoId)

      state[indexTodo] = action.payload
    },
    createNewTodo: (state, action: PayloadAction<TTodoItem>) => {
      state.push(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todoId = action.payload

      const result = filter(state, ({ id }) => id !== todoId)

      return result
    },
    setNewTodos: (state, action: PayloadAction<Array<TTodoItem>>) => {
      const newTodos = action.payload

      return [...newTodos]
    },
    setDoneFlag: (state, action: PayloadAction<TTodoItem>) => {
      const {
        id: todoId,
        isDone: flag,
      } = action.payload

      const indexTodo = findIndex(state, ({ id }) => id === todoId)

      state[indexTodo] = {
        ...action.payload,
        isDone: !flag,
      }
    },
  },
})

export const { changeTodo, createNewTodo, deleteTodo, setNewTodos, setDoneFlag } = todosSlice.actions

export default todosSlice.reducer