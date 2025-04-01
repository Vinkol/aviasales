import React from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import FilterList from '../../components/FilterList/FilterList'
import Tabs from '../../components/Tabs/Tabs'
import TicketList from '../../components/TicketList/TicketList'
import logo from '../../assets/icons/Logo.png'
import cl from './App.module.sass'

const App = () => {
  return (
    <Wrapper>
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <main className={cl.app}>
        <FilterList />
        <div className={cl.app__tickets}>
          <Tabs />
          <TicketList />
        </div>
      </main>
    </Wrapper>
  )
}

export default App
