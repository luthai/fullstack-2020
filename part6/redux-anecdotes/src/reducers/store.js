import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notification from './notificationReducer'

const reducer = combineReducers({
  AnecdoteList: anecdoteReducer,
  message: notification,
})

const store = createStore(reducer, composeWithDevTools())

export default store