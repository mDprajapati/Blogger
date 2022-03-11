import { Footer } from 'antd/lib/layout/layout'
import React from 'react'
function FooterComponent() {
  const style = {
       textAlign: 'center',
       position: "fixed",
       bottom:"0",
       width:"100%",
       height:"70px"
  }
  return (
    <Footer style={style}>Blogger ©2022 Created by Malav Prajapati</Footer>
  )
}

export default FooterComponent