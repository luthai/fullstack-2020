const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'VOTE':
      return action.data
    default:
      return state
  }
}

export const voteNotification = (message) => {
  return {
    type: 'VOTE',
    data: message
  }
}

export default notificationReducer