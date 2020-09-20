import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.AnecdoteList)
  const dispatch = useDispatch()

  const addVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(voteNotification(`you voted "${anecdote.content}"`))

    setTimeout(() => dispatch(voteNotification(null)), 5000);
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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