import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskListing from './pages/TaskListing';
import ProtectedRoute from './protectedroute/ProtectedRoute';
import CreateTask from './pages/CreateTask';
import { useState } from 'react';

const App = () => {

  const [taskToEdit, setTaskToEdit] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />}
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TaskListing setTaskToEdit={setTaskToEdit} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createTask"
        element={
          <ProtectedRoute>
            <CreateTask taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit}/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
