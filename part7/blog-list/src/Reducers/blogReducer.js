import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'UPDATE_BLOG': {
      const { id } = action.data;
      return state.map((blog) => (blog.id !== id ? blog : action.data));
    }
    case 'DELETE_BLOG':
      return action.data;
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const createBlogReducer = (content) => async (dispatch) => {
  const object = await blogService.create(content);
  dispatch({
    type: 'NEW_BLOG',
    data: object,
  });
};

export const updateBlogReducer = (content) => async (dispatch) => {
  const object = await blogService.update(content);
  dispatch({
    type: 'UPDATE_BLOG',
    data: object,
  });
};

export const deleteBlogReducer = (id) => async (dispatch) => {
  const object = await blogService.deleteBlogRouter(id);
  dispatch({
    type: 'DELETE_BLOG',
    data: object,
  });
};

export const initializeBlogs = () => async (dispatch) => {
  const objects = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: objects,
  });
};

export default blogReducer;
