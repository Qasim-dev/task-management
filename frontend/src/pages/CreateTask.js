import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import TextArea from 'antd/es/input/TextArea';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/authSlice';
import { createTask, updateTask } from '../features/taskSlice';

const { Option } = Select;


const CreateTask = (props) => {
    const { taskToEdit, setTaskToEdit } = props;
    const { taskUsers } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [task, setTask] = useState({
        id: taskToEdit ? taskToEdit?._id : null,
        title: taskToEdit ? taskToEdit?.title : '',
        description: taskToEdit ? taskToEdit?.description : '',
        priority: taskToEdit ? taskToEdit?.priority : 'low',
        status: taskToEdit ? taskToEdit?.status : 'pending',
        createdBy: taskToEdit ? taskToEdit?.createdBy : '',
    });

    //Fetch User for Task
    useEffect(() => {
        dispatch(fetchUsers())
        return (() => {
            setTaskToEdit(null)
            setTask({ id: null, title: '', description: '', priority: 'low', status: 'pending', createdBy: '' })
        })
    }, [])

    const handleSubmit = async (values) => {
        let data = {
            id: task?.id ? task?.id : null,
            title: values?.title,
            description: values?.description,
            priority: values?.priority,
            status: values?.status,
            createdBy: values?.createdBy
        }

        if (task.id) {
            await dispatch(updateTask({ id: task.id, data }));
        } else {
            await dispatch(createTask({ data }));
        }

        navigate("/tasks")
    };


    // Format the options for the Select component
    const userOptions = taskUsers.map(user => ({
        value: user._id,
        label: user.username
    }));

    return (
        <>
            <AppHeader fromCreateTask={true} />
            <Row style={{ padding: '16px' }}>
                <Col span={12}>
                    <Link to='/tasks'><Button > <ArrowLeftOutlined /> Back </Button></Link>
                </Col>
            </Row>

            <Row
                justify="center"
                align="middle"
            // style={{ minHeight: '95vh' }}
            >
                <Col span={12} xs={24} sm={16} md={12} lg={8}>
                    <Card
                        title={taskToEdit?._id ? "Update Task" : "Create Task"} // Title based on the task state
                        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }} // Rounded corners for the card
                    >
                        <Form
                            name="createTask"
                            initialValues={task}
                            style={{
                                maxWidth: 360,
                                margin: '0 auto',
                            }}
                            onFinish={handleSubmit}
                            layout='vertical'
                        >
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Title is required!',
                                    },
                                    {
                                        max: 100,
                                        message: 'Title cannot exceed 100 characters!', // Updated max length message
                                    },
                                ]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>

                            <Form.Item
                                label="Assigned To"
                                name="createdBy"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Assigned to is required!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a user"
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={userOptions} // Pass the formatted options
                                />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Description is required!',
                                    },
                                ]}
                            >
                                <TextArea showCount maxLength={150} placeholder="Description" />
                            </Form.Item>

                            <Form.Item
                                label="Priority"
                                name="priority"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Priority is required!',
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={task?.priority}
                                    placeholder="Select priority"
                                >
                                    <Option value="low">Low</Option>
                                    <Option value="medium">Medium</Option>
                                    <Option value="high">High</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Status is required!',
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={task?.status}
                                    placeholder="Select status"
                                >
                                    <Option value="pending">Pending</Option>
                                    <Option value="in-progress">In Progress</Option>
                                    <Option value="completed">Completed</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button block type="primary" htmlType="submit">
                                    {taskToEdit?._id ? "Update Task" : "Create Task"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

        </>

    );
};

export default CreateTask;
