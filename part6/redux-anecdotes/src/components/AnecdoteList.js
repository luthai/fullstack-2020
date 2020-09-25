import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.AnecdoteList)
  const filter = useSelector(state => state.filter)
  const filterAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toUpperCase().includes(filter.toLocaleUpperCase()))

  const addVote = (anecdote) => {
    const updateOject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(vote(updateOject))

    dispatch(voteNotification(`you voted "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {filterAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList