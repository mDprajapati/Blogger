/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { Avatar, Button, Card, Col, Divider, Form, Input, message, Modal, Row } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import HeaderComponent from '../header';
import FooterComponent from '../footer';
import { useNavigate, useParams } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useDispatch, useSelector } from 'react-redux';
import fetchBlogList from '../../Actions/action';
const { Meta } = Card;
function BlogListComponent() {
    let {user_id} = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cknarrative, setCKNarrative] = useState('');
    const navigate = useNavigate();
    const [form] = Form.useForm();
  const [bloggerId, setBloggerId] = useState();
  const [iseEdit, setIsEdit] = useState(false);
  const blogList = useSelector((state) => state);
  const blogDatas = blogList.blog;
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogList());
    }, [])

    const onFinish = (values) => {
        if(!iseEdit) {
            values.blog_details = cknarrative;
            values.user_id = parseInt(user_id);
            axios.post(`https://localhost:44345/api/User/createbolgpost`,values).then(
                response => {
                    if(response.status === 200){
                    form.resetFields();
                    message.success("New Blog Created!!")
                    setIsModalVisible(false)
                    dispatch(fetchBlogList());
                     navigate(`/bloglist/${user_id}`)
                    }
                }
            ).catch(
                error => {
                    throw error;
                }
            )
        }else {
            const id = parseInt(bloggerId);
            values.blog_id = parseInt(bloggerId);
            values.blog_details = cknarrative;
            values.user_id = parseInt(user_id);
            axios.put(`https://localhost:44345/api/User/blog/${id}`, values).then(
                response => {
                    if (response.status === 204) {
                        form.resetFields();
                        message.success("Blog Updated Success")
                        setIsModalVisible(false)
                        dispatch(fetchBlogList());
                    }
                }
            ).catch(
                error => {
                    throw error;
                }
            )
        }

    }

    const goToNewBlog = () => {
        form.resetFields(null);
        setIsModalVisible(true);
    }

    const gotoEdit = (id) => {
        let blogId = parseInt(id);
        setIsModalVisible(true);
        setIsEdit(true);
        axios.get(`https://localhost:44345/api/User/blog/${blogId}`).then(
                            response => {
                                if (response.status === 200) {
                                    setIsModalVisible(true)
                                    form.setFieldsValue({
                                        blog_title: response.data.blog_title,
                                        blog_details: response.data.blog_details
                                    })
                                    if (response.data.blog_details == null)
                                        setCKNarrative('');
                                    else
                                        setCKNarrative(response.data.blog_details);
                                     setBloggerId(response.data.blog_id);
                                }
                            }
                        ).then(
                            
                            error => {
                                throw error;
                            }
                        )
    }
    const handleCancle = () => {
        form.resetFields();
        setIsModalVisible(false);
    }

    const deleteBlog = (id) => {
        const blogId = parseInt(id); 
        axios.delete(`https://localhost:44345/api/User/blog/${blogId}`).then(
            response => {
                
                if(response.status === 200){
                    message.error("Blog deleted successfully")
                    dispatch(fetchBlogList());
                }
            }
        ).catch(

        )
    }

  return (
      
    <>
    <HeaderComponent user_id={user_id} />
    <Row>
      <Col span={24}>
      <Button className='create_blog' type="primary" onClick={goToNewBlog} >
        Create a new blog
      </Button>
      <Modal footer={null} width={900} onCancel={handleCancle} title="Creating a basic blog-post" visible={isModalVisible}>
                    <Form form={form} onFinish={onFinish}>
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
                        <Form.Item label="Blog Details" name='blog_details'>
                          {iseEdit == false ? 
                          <>
                          <CKEditor
                                config={{

                                    toolbar: [
                                        'undo', 'redo',
                                        '|',
                                        'bold', 'italic',
                                        '|',
                                        'alignment',
                                    ],

                                }}

                                editor={ClassicEditor}
                                data=""
                                onReady={editor => {
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setCKNarrative(data);
                                }}
                                onBlur={(event, editor) => {
                                }}
                                onFocus={(event, editor) => {
                                }}
                            />
                          </>
                          :
                          <>
                          <CKEditor
                      config={{

                        toolbar: [
                          'undo', 'redo',
                          '|',
                          'bold', 'italic',
                          '|',
                          'alignment',
                        ],

                      }}

                      editor={ClassicEditor}
                      // data=""
                      data={cknarrative}
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setCKNarrative(data);
                        // console.log( { event, editor, data } );
                      }}
                      onBlur={(event, editor) => {
                        // console.log( 'Blur.', editor );
                      }}
                      onFocus={(event, editor) => {
                        // console.log( 'Focus.', editor );
                      }}
                    />
                          </>}
                           
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal>
      </Col>
    </Row>
    {blogDatas.map((x) => {
        return(
            <>
            <Row>
      <Col span={24}>
        <Card title={x.blog_title} extra={[<EditOutlined onClick={() => gotoEdit(x.blog_id)}  />, <DeleteOutlined onClick={() => deleteBlog(x.blog_id)} />]}>
        <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      
    />
          {x.blog_details}
        </Card>
        <Divider />
      </Col>
      </Row>
            </>
        )
    })}
    <FooterComponent />
    </>
  )
}

export default BlogListComponent