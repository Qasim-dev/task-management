import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const InitialState = {
  isAuthenticated : null,
  loginUser : null,
  loginLoading : false,
  taskUsers : [],
  taskUsersLoader : false,
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({data , navigate}, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
      if(res?.status === 200) {
        toast.success("Successfully login.")
        localStorage.setItem('token', data.token);
        navigate('/tasks')
        return res?.data;
      }    
    } catch (error) {
      return  toast.error(error?.response?.data?.error)
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({data , navigate}, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data);
      navigate('/login')
      toast.success(res?.data.message)
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (_ , {getState,  rejectWithValue }) => {
    try {
      const { isAuthenticated } = getState().auth;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${isAuthenticated}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.loginUser = null;
      state.isAuthenticated = null;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginUser = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginUser = action.payload?.userInfo;
        state.isAuthenticated = action.payload?.token;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.taskUsersLoader = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.taskUsersLoader = false;
        state.taskUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.taskUsersLoader = false;
      })
      // .addCase(fetchUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      // })
      // .addCase(fetchUser.rejected, (state) => {
      //   state.loading = false;
      // });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
