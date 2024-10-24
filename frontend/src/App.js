import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';

const App = () => {
  const [filters, setFilters] = useState({});
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <TaskForm taskToEdit={taskToEdit} onTaskAdded={() => setTaskToEdit(null)} />
      <TaskList filters={filters} onEdit={setTaskToEdit} />
    </div>
  );
};

export default App;
