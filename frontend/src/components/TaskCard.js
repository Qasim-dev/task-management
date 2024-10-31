import React, { useState } from 'react';
import { Card, Tag, Dropdown, Menu, Button, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const TaskCard = (props) => {
    const { task, onStatusChange, onEdit, onDelete } = props

    const { deleteTaskLoader, updateStatusLoader } = useSelector((state) => state.tasks);
    const { loginUser } = useSelector((state) => state.auth);


    const [isExpanded, setIsExpanded] = useState(false); // State to handle description expansion

    // Function to toggle description visibility
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMenuClick = (e) => {
        onStatusChange({ id: task?._id, status: e.key });
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="in-progress">In Progress</Menu.Item>
            <Menu.Item key="completed">Completed</Menu.Item>
        </Menu>
    );

    const badgeStatus = task.priority === 'medium' ? 'success' : task.priority === 'low' ? 'orange' : 'red';

    return (
        <>
            <Badge.Ribbon text={task.priority.charAt(0).toUpperCase() } color={badgeStatus}>
                <Card
                    style={{ margin: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Tooltip title={task.title}>
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>
                                    {task.title}
                                </span>
                            </Tooltip>
                            <Tag color={task.status === 'completed' ? 'green' : task.status === 'in-progress' ? 'orange' : 'red'}>
                                {task.status === 'completed' ? 'Completed' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </Tag>


                        </div>
                    }
                    actions={[
                        <Dropdown overlay={menu} trigger={['click']} key="status" disabled={updateStatusLoader}>
                            <Button type="link" icon={<MoreOutlined />} />
                        </Dropdown>,
                        <Button disabled={loginUser?.role === 'user'} type="link" icon={<EditOutlined />} onClick={onEdit} key="edit" />,
                        <Button danger disabled={deleteTaskLoader || loginUser?.role === 'user'} type="link" icon={<DeleteOutlined />} onClick={onDelete} key="delete" />,
                    ]}
                >
                    <Tooltip title={task.description}>
                        <p style={{
                            whiteSpace: isExpanded ? 'normal' : 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: isExpanded ? 'none' : '20px',
                            transition: 'max-height 0.2s ease'
                        }}>
                            {task.description}
                        </p>
                    </Tooltip>
                    <Button type="link" onClick={toggleDescription}>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                </Card>
            </Badge.Ribbon>
        </>
    );
};

export default TaskCard;
