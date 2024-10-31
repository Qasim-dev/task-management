

import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'

import authReducer from '../features/authSlice';
import taskReducer from '../features/taskSlice';



const reducers = combineReducers({
  auth: authReducer,
  tasks: taskReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
});

export default store;