import { Button, PageHeader } from 'antd'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function HeaderComponent() {
  let {user_id} = useParams();
  const navigate = useNavigate();
  return (
    <div>
    {user_id == null ? <>
      <PageHeader
    className="site-page-header"
    // onBack={() => null}
    title={<Link to={'/'}>Blogger</Link>}
    extra={[
      
        <Button onClick={() => navigate('/login') } key="1" type="primary">
          Login
        </Button>,
        <Button onClick={() => navigate('/register')} key="2">Register</Button>,
      ]}
    subTitle="by Malav Prajapati"
  />
    </> : <>
    <PageHeader
    className="site-page-header"
    // onBack={() => null}
    title={<Link to={'/'}>Blogger</Link>}
    subTitle="by Malav Prajapati"
  />
    </>}
       
    </div>
  )
}

export default HeaderComponent