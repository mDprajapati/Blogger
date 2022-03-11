import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../header';
import FooterComponent from '../footer';
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
const LoginComponent = () => {
    const navigate = useNavigate();
  const onFinish = (values) => {
      
    axios.post(`https://localhost:44345/api/User/login`,values).then(
        response => {
            
            if(response.status === 200){
            
                const user_id = response.data[0].user_id
                navigate(`/bloglist/${user_id}`)
            }
        }
    ).catch(
        error => {
            message.error("Incorrect Email or Password")
            throw error;
        }
    )
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <>
      <HeaderComponent />
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 17,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 13}}>
      <Link to='/register'>Create a New Account !</Link>
      </Form.Item>
    </Form>
    <FooterComponent />
      </>
    
  );
};
export default LoginComponent;