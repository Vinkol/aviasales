import React from 'react'

import cl from './Wrapper.module.sass'

const Wrapper = ({ children }) => {
  return <div className={cl.wrapper}>{children}</div>
}

export default Wrapper
