import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/authSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(loginUser({ data: values, navigate }))
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: '95vh' }}

        >
            <Col span={12} xs={24} sm={16} md={12} lg={8}>
                <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                        margin: '0 auto',
                    }}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                            {
                                max: 30,
                                message: 'Username cannot exceed 30 characters!',
                            },
                        ]}
                    >
                        <Input autoComplete='off' prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <Link to="/">Register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
