import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../services/taskServices';

const TaskForm = ({ taskToEdit, onTaskAdded }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    status: 'pending'
  });

  useEffect(() => {
    if (taskToEdit) setTask(taskToEdit);
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      await addTask(task);
    }
    onTaskAdded();
    setTask({ title: '', description: '', priority: 'low', status: 'pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Task Title"
        required
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Task Description"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
