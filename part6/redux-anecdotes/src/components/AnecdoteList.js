import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const addVote = (anecdote) => {
    const updateOject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    props.vote(updateOject)

    props.voteNotification(`you voted "${anecdote.content}"`, 5)
  }

  return (
    <div>
      {props.filter.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  const anecdotes = state.AnecdoteList
  const filter = state.filter
  const filterAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toUpperCase().includes(filter.toLocaleUpperCase()))

  return {
    filter: filterAnecdotes
  }
}

const mapDispatchToProps = {
  vote,
  voteNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps)
(AnecdoteList)

export default ConnectedAnecdotes