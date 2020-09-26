const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'VOTE':
      return action.data
    case 'RESET':
      return null
    default:
      return state
  }
}

const timeOut = []
export const voteNotification = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'VOTE',
      data: message
    })  

    timeOut.forEach(clearTimeout)

    timeOut.push(setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null
      })
    }, time * 1000))   
  }
}

export default notificationReducer