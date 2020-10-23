const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.data;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

const timeOut = [];
export const setMessage = (message, time) => async (dispatch) => {
  await dispatch({
    type: 'MESSAGE',
    data: message,
  });

  timeOut.forEach(clearTimeout);

  timeOut.push(setTimeout(() => {
    dispatch({
      type: 'RESET',
      data: null,
    });
  }, time * 1000));
};

export default notificationReducer;
