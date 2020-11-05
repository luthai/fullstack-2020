import usersService from '../services/users';

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => async (dispatch) => {
  const objects = await usersService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data: objects,
  });
};

export default usersReducer;
