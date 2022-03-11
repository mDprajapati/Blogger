import url from "../Services/url";
import {
    FETCH_BLOG_DATA,
} from "./actiontype";

export  const fetchBlogList =  () => async (dispatch)  => {
    const response = await url.get('/User/bloglist');
    dispatch({type:FETCH_BLOG_DATA,payload:response.data})
}
export default fetchBlogList;

