import url from "../Services/url";
import { CREATE_BLOG } from "./actiontype";

const createBlog = (values) => async (dispatch) => {
    const response = await url.post('/User/createbolgpost',values);
    dispatch({type:CREATE_BLOG,payload:response.status})
}
export default createBlog;