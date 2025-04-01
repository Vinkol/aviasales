import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../Ticket/Ticket'
import Pagination from '../Pagination/Pagination'
import cl from './TicketList.module.sass'
import { initSearchId, loadTickets } from '../../store/actions'
import { getAmountTickets, sortTickets, filterTickets } from '../../utils/ticketUtils.js'
import ProgressBar from '../ProgressBar/ProgressBar'

const TicketList = () => {
  const session = useSelector((state) => {
    const { tickets, stop, searchId, error } = state.ticketListReducer
    return {
      tickets,
      stop,
      searchId,
      error,
    }
  })
  const sortMethod = useSelector((state) => state.sortReducer.sort)
  const filterOptions = useSelector((state) => state.filtersReducer.items)
  const dispatch = useDispatch()

  const [packedTickets, setPackedTicket] = useState([])
  const [chunkedTickets, setChunkedTickets] = useState([])
  const [chunkTicketGenerator, setChunkTicketGenerator] = useState(null)
  const [isFirstPack, setIsFirstPack] = useState(true)
  const [isEmptyTicketList, setIsEmptyTicketList] = useState(false)

  const _lengthTicketArrayPerPack = 499

  useEffect(() => {
    dispatch(initSearchId())
  }, [])

  useEffect(() => {
    if (!session.stop) {
      if (session.searchId) dispatch(loadTickets(session.searchId))
    } else {
      const sortedPack = updatePackTickets(session.tickets, sortMethod, session.tickets.length)
      updateChunkTickets(sortedPack, chunkedTickets.length)
    }

    if (isFirstPack && session.tickets.length) {
      setIsFirstPack(false)
      const sortedPack = updatePackTickets(session.tickets, sortMethod)
      updateChunkTickets(sortedPack)
    }
  }, [session.searchId, session.tickets, session.error])

  useEffect(() => {
    if (packedTickets.length) {
      const filterOptionsOn = filterOptions
        .map((element) => (element.checked ? element : ''))
        .filter((el) => el !== '')
      const sortedPack = updatePackTickets(session.tickets, sortMethod, 0, filterOptionsOn)
      updateChunkTickets(sortedPack)
    }
  }, [sortMethod, filterOptions])

  const displayMoreTickets = () => {
    const nextChunk = chunkTicketGenerator.next().value
    setChunkedTickets((prevArray) => [...prevArray, ...nextChunk])
  }

  const updatePackTickets = (tickets, sortMethod, lengthTicketArray = 0, filters = []) => {
    const extendedLengthArray = lengthTicketArray ? lengthTicketArray : _lengthTicketArrayPerPack
    const generator = getAmountTickets(tickets, extendedLengthArray)
    const nextPack = generator.next().value
    const filteredPack = filterTickets(nextPack, filters)

    if (!filteredPack.length) {
      setIsEmptyTicketList(true)
      return
    }
    const sortedPack = sortTickets(filteredPack, sortMethod)
    setPackedTicket(sortedPack)
    return sortedPack
  }

  const updateChunkTickets = (sortedTickets, lengthTicketArray = 0) => {
    let prevChunkTickets
    if (lengthTicketArray) {
      prevChunkTickets = getAmountTickets(sortedTickets, lengthTicketArray).next().value
    }
    const chunkGenerator = getAmountTickets(sortedTickets, 5, lengthTicketArray)
    setChunkTicketGenerator(chunkGenerator)
    const nextChunk = chunkGenerator.next().value
    setChunkedTickets(prevChunkTickets || nextChunk)
  }

  return (
    <>
      <ProgressBar />
      <ul className={cl.ticket}>
        {isEmptyTicketList ? (
          <div className={cl.list__empty}>
            <span>Рейсов, подходящих под заданные фильтры, не найдено</span>
          </div>
        ) : (
          chunkedTickets.map((element) => {
            return (
              <li key={element.id}>
                <Ticket {...element} />
              </li>
            )
          })
        )}
      </ul>
      {!isEmptyTicketList && <Pagination displayMoreTickets={displayMoreTickets} />}
    </>
  )
}

export default TicketList
