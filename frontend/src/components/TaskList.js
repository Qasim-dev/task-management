import React, { useState, useEffect } from 'react';
import { deleteTask, getTasks } from '../services/taskServices';

const TaskList = ({ filters, onEdit }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    const response = await getTasks(filters);
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();  // Reload tasks after deletion
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
