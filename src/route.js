import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import BlogComponent from './Containers/BlogContainer/blog';
import BloggerIndexComponent from './Containers/BlogContainer/bloggerindex';
import BlogListComponent from './Containers/BlogContainer/bloglist';
import LoginComponent from './Containers/login-register/login';
import RegisterComponent from './Containers/login-register/register';
import PageNotFound from './Containers/PageNotFound';
function Routing() {
  return (
    <Router>
    <Routes>
    <Route path='*' element={<PageNotFound />} />
      <Route exact path="/" element={<BloggerIndexComponent />} />
      <Route exact path="/login" element={<LoginComponent />} />
      <Route exact path="/register" element={<RegisterComponent />} />
      <Route exact path="/blogs/:user_id" element={<BlogComponent />} />
      <Route exact path="/bloglist/:user_id" element={<BlogListComponent />} />
    </Routes>
</Router>
   
  )
}

export default Routing;