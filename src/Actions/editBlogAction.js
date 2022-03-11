import url from "../Services/url";
import {
    GET_BLOG_ID,
} from "./actiontype";

export  const getBlogDetails =  (id) => async (dispatch)  => {
    const response = await url.get(`/User/blog/${id}`);
    dispatch({type:GET_BLOG_ID,payload:response.data})
}
export default getBlogDetails;

