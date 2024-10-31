// import { deleteTask } from '../services/taskServices';
import { Col, Row } from 'antd';
import TaskCard from './TaskCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteTask, updateStatus } from '../features/taskSlice';

const TaskList = ({ tasks, onEdit }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    await dispatch(deleteTask({ id })); 
  };

  const handleStatusChange = async (id , status) => {
    await dispatch(updateStatus({ id  , status : status})); 
  };
  

  return (
    <Row gutter={2} style={{ marginTop: "15px" }}>
      {tasks && tasks?.map((task) => (
        <Col
          key={task._id}
          xs={24} 
          sm={24} 
          md={8}  
          lg={8}  
          xl={6} 
        >
          <TaskCard
            task={task}
            onStatusChange={(status) => handleStatusChange(task._id, status)}
            onEdit={() => {
              onEdit(task);
              navigate("/createTask")
            } }
            onDelete={() => handleDelete(task._id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;
