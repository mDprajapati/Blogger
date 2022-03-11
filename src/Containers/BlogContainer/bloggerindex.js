/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Card, Col, Divider, Row } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import fetchBlogList from '../../Actions/action';
import FooterComponent from '../footer';
import HeaderComponent from '../header';
const { Meta } = Card;
function BloggerIndexComponent() {
    const blogList = useSelector((state) => state);
    const blogDatas = blogList.blog;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogList());
    }, [])
    return (
        <>
            <HeaderComponent />
            {blogDatas.map((x) => {
                return (
                    <>
                        <Row>
                            <Col span={24}>
                                <Card title={x.blog_title} >
                                    <Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={x.first_name + " " + x.last_name}

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
export default BloggerIndexComponent