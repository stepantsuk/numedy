import { useEffect } from 'react'

import classNames from 'classnames/bind'

import map from 'lodash/map'

import {
  MAX_ITEMS,
  PORTION_SIZE,
} from '../../config'
import { usePagination } from './hooks'
import css from './Pagination.module.css'

export type TPagination = {
  activePage: number,
  setActivePage: React.Dispatch<React.SetStateAction<number>>,
  setPaginationIndex?: (num: number) => void,
  totalCount: number,
}

export const Pagination = ({
  activePage,
  setActivePage,
  setPaginationIndex,
  totalCount,
}: TPagination) => {
  const {
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
  } = usePagination({
    activePage,
    pageSize: MAX_ITEMS,
    portionSize: PORTION_SIZE,
    setActivePage,
    totalCount,
  })

  let cx = classNames.bind(css)

  useEffect(() => {
    if (setPaginationIndex) {
      setPaginationIndex(activePage - 1)
    }
  }, [setPaginationIndex, activePage])

  const showPagination = totalCount > MAX_ITEMS

  if (!showPagination) {
    return null
  }

  return (
    <div className={css.paginationContainer}>
      <div className={css.paginationBlock}>
        {showArrows && (
          <div
            className={`${css.pagination__arrow} ${css.pagination__arrowLeft}`}
            onClick={() => movePaginator('left')}
          />
        )}
        {hideFirstAndLast && (
          <div
            className={cx({
              paginationItem: true,
              paginationItem__active: isActivePage(pagesFirstItem)
            })}
            onClick={() => handleActivePage(pagesFirstItem)}
          >
            {pagesFirstItem}
          </div>
        )}
        {showLeftDots && (
          <div className={css.paginationDots}
          >
            ..
          </div>
        )}
      </div>
      <div className={css.paginationBlock}>
        {map(pagesToShow(), (item, index) => (
          <div
            key={index}
            className={cx({
              paginationItem: true,
              paginationItem__active: isActivePage(item)
            })}
            onClick={() => handleActivePage(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={css.paginationBlock}>
        {showRightDots && (
          <div className={css.paginationDots}
          >
            ..
          </div>
        )}
        {hideFirstAndLast && (
          <div
            className={cx({
              paginationItem: true,
              paginationItem__active: isActivePage(pagesLastItem)
            })}
            onClick={() => handleActivePage(pagesLastItem)}
          >
            {pagesLastItem}
          </div>
        )}
        {showArrows && (
          <div
            className={`${css.pagination__arrow} ${css.pagination__arrowRight}`}
            onClick={() => movePaginator('right')}
          />
        )}
      </div>
    </div>
  )
}