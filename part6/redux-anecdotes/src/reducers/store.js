import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notification from './notificationReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  AnecdoteList: anecdoteReducer,
  filter: filterReducer,
  message: notification,
})

const store = createStore(reducer, composeWithDevTools())

export default store