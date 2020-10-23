const errorNotificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':
      return action.data;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

const timeOut = [];
export const setErrorMessage = (message, time) => async (dispatch) => {
  await dispatch({
    type: 'ERROR_MESSAGE',
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

export default errorNotificationReducer;
