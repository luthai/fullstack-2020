import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import notification from './notificationReducer';
import errorNotification from './errorNotificationReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
  message: notification,
  errorMessage: errorNotification,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
