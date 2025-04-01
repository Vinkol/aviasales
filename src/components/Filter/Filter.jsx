import React from 'react'

import cl from './Filter.module.sass'

const Filter = ({ id, name, checked, text, handleChecked }) => {
  return (
    <label className={cl.filter__field}>
      <input
        className={cl.filter__input}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => handleChecked(id)}
      />
      <span className={cl.filter__name}>{text}</span>
    </label>
  )
}

export default Filter
