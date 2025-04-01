import * as types from './types'

const _baseUrl = 'https://aviasales-test-api.kata.academy'

export function sort(id) {
  return {
    type: types.SORT,
    id,
  }
}

export function filter(id) {
  return {
    type: types.FILTER,
    id,
  }
}

export function filterAll() {
  return {
    type: types.FILTER_ALL,
  }
}

export function initSearchId() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${_baseUrl}/search`)
      const jsonData = await response.json()
      dispatch({
        type: types.INIT_SEARCH_ID,
        data: jsonData,
      })
    } catch (error) {
      dispatch({
        type: types.INIT_SEARCH_ID_ERROR,
        error: error.message,
      })
    }
  }
}

export function loadTickets(searchId, retryCount = 0) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${_baseUrl}/tickets?searchId=${searchId}`)
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      const jsonData = await response.json()

      dispatch({
        type: types.LOAD_TICKETS,
        data: { ...jsonData, error: false },
      })
    } catch (error) {
      console.error('Ошибка при загрузке билетов:', error.message)

      if (retryCount < 3) {
        console.log(`Попытка повторного запроса: ${retryCount + 1}`)
        return dispatch(loadTickets(searchId, retryCount + 1))
      }

      if (error.message.includes('404')) {
        console.log('Ошибка 404 — получаем новый searchId')
        return dispatch(initSearchId())
      }

      dispatch({
        type: types.LOAD_TICKETS,
        data: { tickets: [], stop: true, error: true },
      })
    }
  }
}
