import blogReducer from "./reducer";
import { applyMiddleware, createStore }from "redux";
import thunk from "redux-thunk";

export const store = createStore(
    blogReducer,
    applyMiddleware(thunk));