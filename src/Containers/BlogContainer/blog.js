import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, message, Row, Col, Divider } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './blogCotainer.css'
const BlogComponent = () => {
    let {user_id} = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cknarrative, setCKNarrative] = useState('');
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };


  const onFinish = (values) => {
    values.blog_details = cknarrative;
    values.user_id = parseInt(user_id);
    axios.post(`https://localhost:44345/api/User/createbolgpost`,values).then(
        response => {
            if(response.status === 200){
            message.success("New Blog Created!!")
            setIsModalVisible(false)
             navigate(`/bloglist/${user_id}`)
            }
        }
    ).catch(
        error => {
            throw error;
        }
    )

  }
  return (
    <>
    <Row>
      <Col span={24}>
      <Button className='create_blog' type="primary" onClick={showModal}>
        Create a new blog
      </Button>
      </Col>
    </Row>
     <Divider />
      <Modal footer={null} width={900} onCancel={() => setIsModalVisible(false)}  title="Creating a basic blog-post" visible={isModalVisible}>
        <Form onFinish={onFinish}>
        <Form.Item
        label="Blog Title"
        name="blog_title"
        rules={[
          {
            required: true,
            message: 'Please input your blog_title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Blog Details"  name='blog_details'>
      <CKEditor
                     config={ {
                       
                        toolbar: [
                          'undo', 'redo',
                          '|',
                          'bold', 'italic',
                          '|',
                          'alignment',     
                         ],
                        
                    } }
                    
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setCKNarrative(data);
                    } }
                    onBlur={ ( event, editor ) => {
                    } }
                    onFocus={ ( event, editor ) => {
                    } }
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Form>
      </Modal>
    </>
  );
};
export default BlogComponent;