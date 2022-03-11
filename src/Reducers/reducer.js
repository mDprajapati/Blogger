import {
    FETCH_BLOG_DATA,
    CREATE_BLOG,
    UPDATE_BLOG,
} from "../Actions/actiontype";

const initialState = {
  blog:[],
  };

const reducer = (state = initialState,{type,payload}) => {
  debugger
  switch (type) {
    case FETCH_BLOG_DATA:
      return {
          ...state,
          blog:payload,
        }
    case CREATE_BLOG:
        return {
            ...state,
            blog:payload,
        }
    case UPDATE_BLOG:
        return {
            ...state,
            blog:payload
        }
    
    default: return state
  }
}
export default reducer;
