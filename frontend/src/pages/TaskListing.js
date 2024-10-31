import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Button, Layout } from 'antd';
import TaskList from '../components/TaskList'
import AppHeader from '../components/AppHeader'
import { fetchTasks } from '../features/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';

const { Header } = Layout;

const TaskListing = (props) => {
    const { setTaskToEdit } = props
    const [filters, setFilters] = useState({});
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const { loginUser } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchTasks(filters));
    }, [filters]);

    return (
        <>
            <AppHeader filters={filters} setFilters={setFilters} />
            {loginUser?.role === 'admin' && (
                <div
                    style={
                        {
                            background: 'white',
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }
                    }
                >
                    <Link to='/createTask'><Button > <PlusOutlined /> Create </Button></Link>
                </div>
            )}
            {tasks && tasks?.length > 0 ? (
                <TaskList tasks={tasks} onEdit={setTaskToEdit} />
            ) : (
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    width: '300px',
                  }}
                >
                  <FileExcelOutlined style={{ fontSize: '80px', color: '#c4c4c4', marginBottom: '15px' }} />
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#606060' }}>No Data Found !</p>
                  <p style={{ fontSize: '14px', color: '#a0a0a0' }}>Please check back later.</p>
                </div>
              </div>
            )
            }

        </>
    )
}

export default TaskListing