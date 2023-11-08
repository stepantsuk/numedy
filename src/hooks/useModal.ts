import { useState, useCallback } from 'react'

export const useModal = (initialState: boolean | undefined = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback(() => setIsOpen(true), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    close,
    isOpen,
    open,
    toggle,
  }
}
