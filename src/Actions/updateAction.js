import url from "../Services/url";
import { UPDATE_BLOG } from "./actiontype";

const updateBlog = (values) => async (dispatch) => {
    const response = await url.put(`/User/blog/${values.blog_id}`,values);
    dispatch({type:UPDATE_BLOG,payload:response});
}
export default updateBlog;