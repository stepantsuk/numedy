import { useState } from 'react'

import size from 'lodash/size'
import times from 'lodash/times'
import slice from 'lodash/slice'

type TUsePagination = {
  activePage: number,
  pageSize: number,
  portionSize: number,
  setActivePage: React.Dispatch<React.SetStateAction<number>>,
  totalCount: number,
}

export const usePagination = ({
  activePage,
  pageSize,
  portionSize,
  setActivePage,
  totalCount,
}: TUsePagination) => {
  const [rightBorder, setRightBorder] = useState(portionSize + 1)
  // const [activePage, setActivePage] = useState(1)

  const isActivePage = (page: number) => page === activePage
  const pagesCount = Math.ceil(totalCount / pageSize)
  const pages = times(pagesCount, (i) => i + 1)
  const pagesFirstItem = pages[0]
  const pagesLastItem = pages[size(pages) - 1]
  const leftBorder = rightBorder - portionSize
  const showArrows = size(pages) > portionSize
  const showLeftDots = activePage > portionSize
  const showRightDots = (activePage < (pagesCount - portionSize + 1))
  const hideFirstAndLast = !(pagesCount <= portionSize)

  const movePaginator = (direction: 'left' | 'right') => {
    // // переключение влево активной страницы с промежутке с начала (1) до
    // // portionSize включительно и фиксация окна пагинатора
    const toLeftInBegin = (direction === 'left' && rightBorder > portionSize && ((rightBorder - portionSize) < portionSize))
    // // переключение влево активной страницы с промежутке с
    // конца до (pagesCount - portionSize + 1)
    // // и фиксация окна пагинатора
    const toLeftInEnd = (direction === 'left' && rightBorder > portionSize && (activePage > (pagesCount - portionSize + 1)))
    // // если выбранная страница с (portionSize + 1)
    // // до (pagesCount - portionSize) - позволяет двигать
    // // окно пагинатора
    const toLeftInMiddle = (direction === 'left' && rightBorder > portionSize)
    const firstPageIsActive = activePage === 1

    // // здесь позволяет перещелкивать активную страницу в отрезке с
    // // (pagesCount - portionSize + 1) до pagesCount и фиксировать окно пагинатора
    const toRightInEnd = (direction === 'right' && pagesCount > rightBorder && ((pagesCount - rightBorder) < portionSize))
    // // здесь позволяет перещелкивать активную страницу в отрезке с 1 до
    // // portionSize и не сдвигать окно пагинатора
    const toRightInBegin = (direction === 'right' && pagesCount > rightBorder && (activePage < portionSize))
    // // если выбранная страница с (portionSize + 1)
    // // до (pagesCount - portionSize)- - позволяет двигать
    // // окно пагинатора
    const toRightInMiddle = (direction === 'right' && pagesCount > rightBorder)
    const lastPageIsActive = activePage === pagesCount

    switch (true) {
      case toLeftInBegin:
        if (firstPageIsActive) {
          break
        }
        setRightBorder(portionSize + 1)
        setActivePage(activePage - 1)
        break
      case toLeftInEnd:
        setActivePage(activePage - 1)
        break
      case toLeftInMiddle:
        setRightBorder(rightBorder - 1)
        setActivePage(activePage - 1)
        break
      case toRightInEnd:
        if (lastPageIsActive) {
          break
        }
        setRightBorder(pagesCount - 1)
        setActivePage(activePage + 1)
        break
      case toRightInBegin:
        setActivePage(activePage + 1)
        break
      case toRightInMiddle:
        setRightBorder(rightBorder + 1)
        setActivePage(activePage + 1)
        break
      default:
        break
    }
  }

  const handleActivePage = (page: number) => {
    setActivePage(page)
    if (page <= portionSize) {
      setRightBorder(portionSize + 1)
      return
    }
    if (page >= (pagesCount - portionSize + 1)) {
      setRightBorder(pagesCount - 1)
      return
    }
    setRightBorder(page + 1)
  }

  const pagesToShow = () => {
    if (pagesCount <= portionSize) {
      return pages
    }

    return slice(
      pages,
      leftBorder,
      rightBorder,
    )
  }

  return {
    activePage,
    handleActivePage,
    hideFirstAndLast,
    isActivePage,
    movePaginator,
    pagesFirstItem,
    pagesLastItem,
    pagesToShow,
    showArrows,
    showLeftDots,
    showRightDots,
  }
}
