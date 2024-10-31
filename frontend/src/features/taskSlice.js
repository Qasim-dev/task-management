// src/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { thunk } from 'redux-thunk';

// let token = localStorage.getItem('token')


// src/slices/taskSlice.js
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ priority, status } = {}, {getState,  rejectWithValue }) => {
      try {
        const { isAuthenticated } = getState().auth;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
          params: { priority, status },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ data }, { getState, rejectWithValue }) => {
    const { isAuthenticated } = getState().auth;
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, data, {
        headers: { Authorization: `Bearer ${isAuthenticated}` },
      });
      if(response?.status === 200) {
        toast.success(`${data?.id ? "Task updated successfully." : "Task created successfully."}`);
        thunk.dispatch(fetchTasks())
        return response.data;
      }  
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, data }, { getState, rejectWithValue, dispatch }) => {
      const { isAuthenticated } = getState().auth;
      try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, data, {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
        });
  
        if (response.status === 200) {
          toast.success('Task updated successfully.');
          dispatch(fetchTasks()); 
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Update failed');
      }
    }
  );

  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({ id }, { getState, rejectWithValue , dispatch }) => { // Use `dispatch` from `createAsyncThunk`
      const { isAuthenticated } = getState().auth;
  
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
        });
  
        if (response.status === 200) {
          toast.success(response?.data?.message);
          dispatch(fetchTasks()); 
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Delete failed');
      }
    }
  );
  
  export const updateStatus = createAsyncThunk(
    'tasks/updateStatus',
    async ({ id, status }, { getState, rejectWithValue, dispatch }) => {
      const { isAuthenticated } = getState().auth;
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/${id}`, status, {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
        });
  
        if (response.status === 200) {
          toast.success('Task status updated successfully.');
          dispatch(fetchTasks()); 
          return response.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Update failed');
      }
    }
  );
  
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loadTasks: false,
    createTaskLoader: false,
    deleteTaskLoader : false,
    updateStatusLoader : false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loadTasks = false;
        state.tasks = action.payload;
      })
       .addCase(fetchTasks.pending, (state) => {
        state.loadTasks = true;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loadTasks = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskLoader = false;
        state.tasks = action.payload;
      })
       .addCase(createTask.pending, (state) => {
        state.createTaskLoader = true;
      })
      .addCase(createTask.rejected, (state) => {
        state.createTaskLoader = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteTaskLoader = false;
        // state.tasks = action.payload;
      })
       .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoader = true;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.deleteTaskLoader = false;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.updateStatusLoader = false;
        // state.tasks = action.payload;
      })
       .addCase(updateStatus.pending, (state) => {
        state.updateStatusLoader = true;
      })
      .addCase(updateStatus.rejected, (state) => {
        state.updateStatusLoader = false;
      })
    //   .addCase(createTask.fulfilled, (state, action) => {
    //     state.loadTasks = false;
    //     state.tasks.push(action.payload);
    //   });
  },
});

// export const { logout } = authSlice.actions;
export default taskSlice.reducer;
