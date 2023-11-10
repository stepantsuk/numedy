import map from 'lodash/map'

import { LEXICS } from '../../config'
import {
  DEFAULT_NAME,
  SELECT_OPTIONS,
} from './config'

import css from './Select.module.css'

type TSelect = {
  onChange: (value: string) => void,
  sortValue: string,
}

export const Select = (
  {
    onChange,
    sortValue,
  }: TSelect) => {
  const { sortingLexic } = LEXICS

  const optionsArr = Object.keys(SELECT_OPTIONS)

  return (
    <div className={css.selectContainer}>
      <div>
        {sortingLexic}
      </div>
      <select
        value={sortValue}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      >
        <option disabled value="">
          {DEFAULT_NAME}
        </option>
        {map(
          optionsArr,
          (option) => {
            return (
              <option key={option} value={option}>
                {SELECT_OPTIONS[option as keyof typeof SELECT_OPTIONS]}
              </option>)
          })}
      </select>
    </div>
  );
};