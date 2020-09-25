import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTES':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updateObject = await anecdoteService.updateAnecdote(anecdote)
    dispatch({
      type: 'ADD_VOTES',
      data: updateObject
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newObject = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newObject
    })
  }
}

export default reducer