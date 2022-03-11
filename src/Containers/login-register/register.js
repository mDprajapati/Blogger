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
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const RegisterComponent = () => {
    const navigate = useNavigate();
  const onFinish = (values) => {
    axios.post(`https://localhost:44345/api/User`,values).then(
        response => {
            if(response.status === 200){
                message.success("User Created Successfully!!!")
                navigate('/login')
            }
        }
    ).catch(
        error => {
            message.error("Something Went Wrong!!")
            throw error;
        }
    )
  };

  return (
      <>
      <HeaderComponent />
<Form {...layout}
labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
 name="nest-messages"
  onFinish={onFinish}
   validateMessages={validateMessages}>
      <Form.Item
        name='first_name'
        label="FirstName"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='last_name'
        label="LastName"
        rules={[
          {
            required: true,
            message: 'Please input your lastname!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label="Email"
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 13}}>
      <Link to='/login'>Already Have An Account ?</Link>
      </Form.Item>
    </Form>
    <FooterComponent />
      </>
    
  );
};

export default RegisterComponent;