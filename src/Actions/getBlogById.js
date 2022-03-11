import url from "../Services/url";
import {
    GET_BLOG_RECORD_ID,
} from "./actiontype";

export  const fetchBlogRecordById =  (id) => async (dispatch)  => {
    const response = await url.get(`/User/getblogbyid/${id}`);
    dispatch({type:GET_BLOG_RECORD_ID,payload:response.data})
}
export default fetchBlogRecordById;

