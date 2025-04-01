import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../../components/Filter/Filter'
import cl from './FilterList.module.sass'
import { filter, filterAll } from '../../store/actions'

const FilterList = () => {
  const filters = useSelector((state) => {
    const { filtersReducer } = state
    return filtersReducer.items
  })
  const dispatch = useDispatch()

  const handleCheckAll = () => {
    dispatch(filterAll())
  }

  const handleCheckOne = (id) => {
    dispatch(filter(id))
  }

  return (
    <aside className={cl.filter}>
      <span>Количество пересадок</span>
      <ul className={cl.filter__list}>
        {filters.map((event) => {
          if (event.id === 1) {
            return (
              <li className={cl.filter__item} key={event.id}>
                <Filter {...event} handleChecked={handleCheckAll} />
              </li>
            )
          } else {
            return (
              <li className={cl.filter__item} key={event.id}>
                <Filter {...event} handleChecked={handleCheckOne} />
              </li>
            )
          }
        })}
      </ul>
    </aside>
  )
}

export default FilterList
