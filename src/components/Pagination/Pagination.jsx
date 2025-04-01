import React from 'react'

import cl from './Pagination.module.sass'

const Pagination = ({ displayMoreTickets }) => {
  return (
    <button className={cl.pagination} type="button" onClick={displayMoreTickets}>
      <span>Показать еще 5 билетов!</span>
    </button>
  )
}

export default Pagination
